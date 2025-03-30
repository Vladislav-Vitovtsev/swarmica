import { Routes, Route } from "react-router-dom";
import { SearchPage } from "@/pages/search";
import { HistoryPage } from "@/pages/history";
import { MainLayout } from "@/shared/ui/mainLayout";
import { useLocaleSync } from "@/shared/lib/hooks";

export const Router = () => {
  useLocaleSync();

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </MainLayout>
    </>
  );
};
