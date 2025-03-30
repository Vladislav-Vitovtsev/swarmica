import { useApiQuery } from "../lib/hooks/useApi";
import { Instance } from "../types";

export const useInstance = () => {
  return useApiQuery<Instance>("/api/instance");
};
