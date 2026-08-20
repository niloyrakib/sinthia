import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { WP_CONFIG } from "./config";

export class WpApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "WpApiError";
    this.status = status;
  }
}

export const wpClient: AxiosInstance = axios.create({
  baseURL: WP_CONFIG.apiUrl,
  timeout: 8000,
  headers: { Accept: "application/json" },
});

wpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "Failed to reach the WordPress API";
    return Promise.reject(new WpApiError(message, status));
  },
);

export interface WpPaginationMeta {
  total: number;
  totalPages: number;
}

/** WP exposes total counts via response headers, not the body. */
export function readPaginationMeta(response: AxiosResponse): WpPaginationMeta {
  return {
    total: Number(response.headers["x-wp-total"] ?? 0),
    totalPages: Number(response.headers["x-wp-totalpages"] ?? 0),
  };
}
