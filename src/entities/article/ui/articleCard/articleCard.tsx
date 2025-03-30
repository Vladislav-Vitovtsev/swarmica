import { useSetRecoilState, useRecoilValue } from "recoil";
import styles from "./articleCard.module.scss";
import { viewedArticlesState } from "../../model";
import {
  Article,
  SearchArticle,
  ArticleSchema,
  SearchArticleSchema,
} from "@/shared/types";
import { useTranslation } from "react-i18next";
import { localeState } from "@/widgets/navigation";
import { useMemo } from "react";
import MarkdownIt from "markdown-it";
import { z } from "zod";

interface ArticleCardProps {
  article: Article | SearchArticle;
}

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const parseMarkdown = (text: string | undefined) => {
  if (!text) return "";
  return md.render(text);
};

const getArticleUrl = (
  urls: Record<string, string>,
  locale: string,
): string => {
  return urls[locale] || Object.values(urls)[0] || "";
};

const getArticleTitle = (
  title: Record<string, string>,
  highlight: { title?: string },
  locale: string,
): string => {
  if (highlight.title) return highlight.title;
  return title[locale] || Object.values(title)[0] || "";
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const { t } = useTranslation();
  const currentLocale = useRecoilValue(localeState);
  const setViewedArticles = useSetRecoilState(viewedArticlesState);
  const viewedArticles = useRecoilValue(viewedArticlesState);

  const validatedArticle = useMemo(() => {
    const result = z
      .union([ArticleSchema, SearchArticleSchema])
      .safeParse(article);
    if (!result.success) {
      console.error("Invalid article data:", result.error);
      return article;
    }
    return result.data;
  }, [article]);

  const isViewed = useMemo(() => {
    return viewedArticles.some((viewed) => viewed.id === validatedArticle.id);
  }, [viewedArticles, validatedArticle.id]);

  const url = useMemo(
    () => getArticleUrl(validatedArticle.public_urls, currentLocale),
    [validatedArticle.public_urls, currentLocale],
  );

  const formattedDate = useMemo(() => {
    return new Date(validatedArticle.created_at).toLocaleDateString(
      currentLocale,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  }, [validatedArticle.created_at, currentLocale]);

  const handleClick = () => {
    const articleWithViewedAt = {
      ...validatedArticle,
      viewedAt: new Date().toISOString(),
    };
    setViewedArticles((prev) => [articleWithViewedAt, ...prev]);
  };

  const title = useMemo(() => {
    const titleText = getArticleTitle(
      validatedArticle.title,
      validatedArticle.highlight,
      currentLocale,
    );
    return parseMarkdown(titleText);
  }, [validatedArticle.title, validatedArticle.highlight, currentLocale]);

  return (
    <article className={`${styles.card} ${isViewed ? styles.viewed : ""}`}>
      <header className={styles.header}>
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={styles.meta}>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.status}>
            {t(validatedArticle.status.toLowerCase())}
          </span>
          {isViewed && (
            <span className={styles.viewedBadge}>{t("viewed")}</span>
          )}
        </div>
      </header>

      {validatedArticle.highlight.body && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(validatedArticle.highlight.body),
          }}
        />
      )}

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.author}>
            {t("author")}: {validatedArticle.author}
          </span>
          <span className={styles.rank}>
            {t("rankValue", { value: validatedArticle.rank.toFixed(3) })}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={handleClick}
        >
          {t("readMore")}
        </a>
      </footer>
    </article>
  );
};
