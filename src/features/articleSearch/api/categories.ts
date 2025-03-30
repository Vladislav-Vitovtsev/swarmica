import { useApiQuery } from "@/shared/lib/hooks";
import { Category } from "@/shared/types";
import { PaginationResponse } from "@/shared/types/common";

export const useCategories = () => {
  return useApiQuery<PaginationResponse<Category>>("/api/categories");
};
