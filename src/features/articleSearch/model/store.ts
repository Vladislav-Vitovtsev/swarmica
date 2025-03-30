import { atom } from "recoil";

import { SearchQuery } from "@/shared/types";

export const searchParamsState = atom<SearchQuery>({
  key: "searchParamsState",
  default: {
    search: "",
    categories: [],
    status: [],
    locale: "ru",
  },
});

export const isSearchingState = atom<boolean>({
  key: "isSearchingState",
  default: false,
});
