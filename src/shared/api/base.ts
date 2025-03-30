import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError, RequestConfig } from "@/shared/types";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        "Произошла ошибка при выполнении запроса",
      code: error.response?.status,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  },
);

export async function apiRequest<TResponse = unknown, TBody = unknown>(
  url: string,
  config: RequestConfig<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", headers, params, body, signal } = config;

  const axiosConfig: AxiosRequestConfig = {
    method,
    url: url.endsWith("/") ? url : `${url}/`,
    headers,
    params,
    data: body,
    signal,
  };

  const response = await client.request<TResponse>(axiosConfig);
  return response.data;
}
