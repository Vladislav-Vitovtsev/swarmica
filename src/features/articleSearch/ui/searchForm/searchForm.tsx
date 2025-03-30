import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Select from "react-select";
import {
  ArticleStatus,
  ArticleStatusSchema,
  SearchQuerySchema,
} from "@/shared/types";
import { useArticlesSearch } from "../../api/search";
import { localeState } from "@/widgets/navigation";
import { searchParamsState, isSearchingState } from "../../model";
import styles from "./searchForm.module.scss";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useCategories } from "../../api/categories";

type StatusOption = {
  value: ArticleStatus;
  label: string;
};

type CategoryOption = {
  value: string;
  label: string;
};

export const SearchForm = () => {
  const { t } = useTranslation();
  const currentLocale = useRecoilValue(localeState);
  const [searchParams, setSearchParams] = useRecoilState(searchParamsState);
  const [, setIsSearching] = useRecoilState(isSearchingState);

  useEffect(() => {
    const updatedParams = SearchQuerySchema.merge(
      z.object({
        locale: z.string(),
      }),
    ).safeParse({
      ...searchParams,
      locale: currentLocale,
    });

    if (updatedParams.success) {
      setSearchParams(updatedParams.data);
    }
  }, [currentLocale, setSearchParams]);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  const { refetch: searchArticles } = useArticlesSearch(searchParams);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedParams = SearchQuerySchema.safeParse(searchParams);
    if (!validatedParams.success) {
      console.error("Invalid search params:", validatedParams.error);
      return;
    }

    setIsSearching(true);
    await searchArticles();
  };

  const categoryOptions: CategoryOption[] =
    categoriesData?.results?.map((cat) => ({
      value: String(cat.id),
      label: currentLocale === "ru" ? cat.name.ru : cat.name.en,
    })) || [];

  const statusOptions: StatusOption[] = ArticleStatusSchema.options.map(
    (status) => ({
      value: status,
      label: t(status.toLowerCase()),
    }),
  );

  const isSearchDisabled = !searchParams.search.trim();

  return (
    <form onSubmit={handleSubmit} className={styles.group}>
      <div className={styles.row}>
        <Select<CategoryOption, true>
          isMulti
          closeMenuOnSelect={false}
          value={categoryOptions.filter((opt) =>
            searchParams.categories?.includes(opt.value),
          )}
          onChange={(selected) =>
            setSearchParams((prev) => ({
              ...prev,
              categories: selected.map((opt) => opt.value),
            }))
          }
          options={categoryOptions}
          isLoading={isCategoriesLoading}
          placeholder={t("selectCategories")}
          className={styles.select}
          classNamePrefix="select"
          noOptionsMessage={() => t("noCategories")}
        />
      </div>

      <div className={styles.row}>
        <Select<StatusOption, true>
          isMulti
          closeMenuOnSelect={false}
          value={statusOptions.filter((opt) =>
            searchParams.status?.includes(opt.value),
          )}
          onChange={(selected) =>
            setSearchParams((prev) => ({
              ...prev,
              status: selected.map((opt) => opt.value),
            }))
          }
          options={statusOptions}
          className={styles.select}
          classNamePrefix="select"
          placeholder={t("status")}
        />
      </div>

      <div className={styles.row}>
        <input
          type="text"
          value={searchParams.search}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
          placeholder={t("searchArticles")}
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isSearchDisabled}
        >
          {t("searchButton")}
        </button>
      </div>
    </form>
  );
};
