import { useInstance } from "@/shared/api/instance";

export function usePrefetchData() {
  const instance = useInstance();

  return {
    instance: instance.data,
    isLoading: instance.isLoading,
    error: instance.error,
  };
}
