import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocaleSwitch } from "./localeSwitch";
import styles from "./navigation.module.scss";

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>Swarmica</div>
          <div className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              end
            >
              {t("search")}
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {t("history")}
            </NavLink>
            <div className={styles.locale}>
              <LocaleSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
