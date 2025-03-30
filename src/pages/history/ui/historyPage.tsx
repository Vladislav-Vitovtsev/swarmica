import { useRecoilValue } from "recoil";
import { viewedArticlesState } from "@/entities/article";
import styles from "./historyPage.module.scss";
import { useTranslation } from "react-i18next";
import { localeState } from "@/widgets/navigation";
import { useMemo } from "react";

interface GroupedArticle {
  id: number;
  title: Record<string, string>;
  public_urls: Record<string, string>;
  viewDates: string[];
  lastViewed: string;
}

export const HistoryPage = () => {
  const { t } = useTranslation();
  const currentLocale = useRecoilValue(localeState);
  const viewedArticles = useRecoilValue(viewedArticlesState);

  const groupedArticles = useMemo(() => {
    const groups = viewedArticles.reduce<Record<string, GroupedArticle>>(
      (acc, article) => {
        if (!acc[article.id]) {
          acc[article.id] = {
            id: article.id,
            title: article.title,
            public_urls: article.public_urls,
            viewDates: [],
            lastViewed: article.viewedAt!,
          };
        }
        acc[article.id].viewDates.push(article.viewedAt!);
        // Обновляем дату последнего просмотра, если текущий просмотр более поздний
        if (
          new Date(article.viewedAt!) > new Date(acc[article.id].lastViewed)
        ) {
          acc[article.id].lastViewed = article.viewedAt!;
        }
        return acc;
      },
      {},
    );

    return Object.values(groups).sort(
      (a, b) =>
        new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime(),
    );
  }, [viewedArticles]);

  if (!viewedArticles.length) {
    return (
      <>
        <h1 className={styles.title}>{t("viewHistory")}</h1>
        <p>{t("noViewedArticles")}</p>
      </>
    );
  }

  const getLocalizedField = (field: Record<string, string>) => {
    return field[currentLocale] || Object.values(field)[0] || "";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(currentLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <h1 className={styles.title}>{t("viewHistory")}</h1>
      <div className={styles.list}>
        {groupedArticles.map((article) => {
          const url = getLocalizedField(article.public_urls);
          const title = getLocalizedField(article.title);

          return (
            <div key={article.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <h3>{title}</h3>
                <div className={styles.viewCount}>
                  {t("viewCount", { count: article.viewDates.length })}
                </div>
              </div>
              <div className={styles.viewDates}>
                <div className={styles.lastViewed}>
                  {t("lastViewed")}: {formatDate(article.lastViewed)}
                </div>
                {article.viewDates.length > 1 && (
                  <details className={styles.viewHistory}>
                    <summary>{t("previousViews")}</summary>
                    <ul>
                      {article.viewDates
                        .sort(
                          (a, b) =>
                            new Date(b).getTime() - new Date(a).getTime(),
                        )
                        .slice(1)
                        .map((date, index) => (
                          <li key={index}>{formatDate(date)}</li>
                        ))}
                    </ul>
                  </details>
                )}
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {t("openArticle")}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};
