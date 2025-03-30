import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>{children}</BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};
