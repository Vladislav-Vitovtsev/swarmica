import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { apiRequest } from "../../api/base";
import { RequestConfig, ApiError } from "@/shared/types";

interface UseApiQueryOptions<TResponse> {
  config?: RequestConfig;
  enabled?: boolean;
  retry?: boolean | number;
  retryDelay?: number;
  staleTime?: number;
  gcTime?: number;
  refetchOnMount?: boolean | "always";
  refetchOnWindowFocus?: boolean | "always";
  refetchOnReconnect?: boolean | "always";
  onSuccess?: (data: TResponse) => void;
  onError?: (error: ApiError) => void;
}

interface UseApiMutationOptions<TResponse, TBody>
  extends Omit<UseMutationOptions<TResponse, ApiError, TBody>, "mutationFn"> {
  url: string;
  config?: Omit<RequestConfig<TBody>, "body">;
  invalidateQueries?: string[];
}

export function useApiQuery<TResponse = unknown>(
  url: string,
  { config, ...options }: UseApiQueryOptions<TResponse> = {},
) {
  return useQuery({
    queryKey: [url, config?.params],
    queryFn: () => apiRequest<TResponse>(url, config),
    ...options,
  });
}

export function useApiMutation<TResponse = unknown, TBody = unknown>({
  url,
  config,
  invalidateQueries,
  ...options
}: UseApiMutationOptions<TResponse, TBody>) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, ApiError, TBody>({
    mutationFn: (variables) =>
      apiRequest<TResponse, TBody>(url, { ...config, body: variables }),
    onSettled: () => {
      if (invalidateQueries) {
        invalidateQueries.forEach((queryKey) =>
          queryClient.invalidateQueries({ queryKey: [queryKey] }),
        );
      }
    },
    ...options,
  });
}
