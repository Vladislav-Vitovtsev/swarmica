import { useArticlesSearch } from "../../api/search";
import { ArticleCard } from "@/entities/article";
import {
  SearchQuery,
  SearchResponse,
  SearchResponseSchema,
} from "@/shared/types";
import styles from "./searchResults.module.scss";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface SearchResultsProps {
  searchParams: SearchQuery;
}

export const SearchResults = ({ searchParams }: SearchResultsProps) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useArticlesSearch(searchParams);

  const validatedData = useMemo(() => {
    if (!data) return null;

    const result = SearchResponseSchema.safeParse(data);
    if (!result.success) {
      console.error("Invalid search response:", result.error);
      return null;
    }

    return result.data;
  }, [data]) as SearchResponse | null;

  if (isLoading) {
    return <div className={styles.message}>{t("loading")}</div>;
  }

  if (error) {
    return <div className={styles.error}>{t("searchError")}</div>;
  }

  if (!validatedData?.results?.length) {
    return <div className={styles.message}>{t("noArticlesFound")}</div>;
  }

  return (
    <div className={styles.list}>
      {validatedData.results.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
