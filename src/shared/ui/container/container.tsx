import styles from "./container.module.scss";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
