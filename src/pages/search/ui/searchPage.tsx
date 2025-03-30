import { SearchWidget } from "@/widgets/search";
import { useTranslation } from "react-i18next";

export const SearchPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("searchPageTitle")}</h1>
      <SearchWidget />
    </>
  );
};
