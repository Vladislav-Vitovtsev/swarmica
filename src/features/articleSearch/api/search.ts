import { useApiQuery } from "@/shared/lib/hooks";
import { SearchQuery, SearchResponse } from "@/shared/types";

const formatSearchParams = (params?: SearchQuery) => {
  if (!params) return {};

  const formatted: Record<string, string | number | boolean | undefined> = {
    search: params.search,
    locale: params.locale,
  };

  if (params.categories?.length) {
    formatted.category = params.categories.join(",");
  }

  if (params.status?.length) {
    formatted.status = params.status.join(",");
  }

  return formatted;
};

export const useArticlesSearch = (searchQuery?: SearchQuery) => {
  return useApiQuery<SearchResponse>("/api/search/articles", {
    config: {
      params: formatSearchParams(searchQuery),
    },
    enabled: false,
  });
};
