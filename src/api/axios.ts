import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const USE_MOCK = false;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 30000,
  headers: {
    "X-Pinggy-No-Screen": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      useAuthStore.getState().logout();
      // Soft redirect removed to prevent wiping user state when auth fails on a public page.
    }
    return Promise.reject(error);
  },
);

/** Tiny helper to simulate latency for mock data. */
export function mockDelay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
