import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiSuccess } from "@/types/api.types";
import type { RefreshResponseData } from "@/types/auth.types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Bare instance without interceptors, used only for the refresh call itself
// to avoid an infinite interceptor loop.
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

// Queue of requests waiting for an in-flight refresh to complete, so
// concurrent 401s don't trigger multiple refresh calls.
let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  for (const resolve of pendingQueue) {
    resolve(token);
  }
  pendingQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const status = error.response?.status;

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // /auth/login and /auth/refresh returning 401 means invalid
    // credentials/token, not an expired session — don't try to refresh.
    if (
      originalRequest.url === ENDPOINTS.auth.login ||
      originalRequest.url === ENDPOINTS.auth.refresh
    ) {
      return Promise.reject(error);
    }

    const { refreshToken, clearSession, setAccessToken } =
      useAuthStore.getState();

    if (!refreshToken) {
      clearSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const { data } = await refreshClient.post<
        ApiSuccess<RefreshResponseData>
      >(ENDPOINTS.auth.refresh, { refreshToken });

      const newAccessToken = data.data.accessToken;
      setAccessToken(newAccessToken);
      resolveQueue(newAccessToken);

      originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
      return api(originalRequest);
    } catch (refreshError) {
      resolveQueue(null);
      clearSession();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
