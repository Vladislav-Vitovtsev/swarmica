import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 30 * 60 * 1000, // 30 минут
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});
