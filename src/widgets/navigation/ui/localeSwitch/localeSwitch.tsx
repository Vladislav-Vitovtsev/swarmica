import { useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { localeState } from "../../model/store";
import { useInstance } from "@/shared/api/instance";
import styles from "./localeSwitch.module.scss";

export const LocaleSwitch = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setLocale] = useRecoilState(localeState);
  const { data: instance } = useInstance();

  const handleLocaleChange = (locale: string) => {
    setLocale(locale);
    setIsOpen(false);
  };

  if (!instance?.locales.length) return null;

  return (
    <div className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("selectLanguage")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className={styles.currentLocale}>
          {currentLocale.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {instance.locales.map((locale) => (
            <button
              key={locale}
              type="button"
              className={styles.option}
              onClick={() => handleLocaleChange(locale)}
            >
              {t(locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
