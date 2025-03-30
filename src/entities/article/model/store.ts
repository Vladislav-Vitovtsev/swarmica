import { atom } from "recoil";
import { Article } from "@/shared/types";
import { VIEWED_ARTICLES_STORAGE_KEY } from "@/shared/constants/storage";

export const viewedArticlesState = atom<Article[]>({
  key: "viewedArticlesState",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedArticles = localStorage.getItem(VIEWED_ARTICLES_STORAGE_KEY);
      if (savedArticles) {
        setSelf(JSON.parse(savedArticles));
      }

      onSet((newArticles) => {
        localStorage.setItem(
          VIEWED_ARTICLES_STORAGE_KEY,
          JSON.stringify(newArticles),
        );
      });
    },
  ],
});
