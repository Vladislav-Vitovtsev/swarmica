import { ReactNode } from "react";
import styles from "./mainLayout.module.scss";
import { Navigation } from "@/widgets/navigation";
import { Container } from "../container/container";
import { usePrefetchData } from "@/app/hooks";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isLoading, error } = usePrefetchData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Container>
          <Navigation />
        </Container>
      </header>
      <main className={styles.content}>
        <Container>{children}</Container>
      </main>
    </div>
  );
};
