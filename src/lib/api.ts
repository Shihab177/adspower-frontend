import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosInstance,
} from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// 🔐 main api
const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// 🔄 separate refresh instance (no interceptor)
const refreshApi: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
};

let isRefreshing = false;
let queue: QueueItem[] = [];

// 🔁 queue processor
const processQueue = (error?: unknown) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });

  queue = [];
};

// 🔥 interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as (InternalAxiosRequestConfig & {
        _retry?: boolean;
      }) | undefined;

    // ❌ safety checks
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    // ❌ prevent refresh loop
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // 🔐 handle expired access token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ⏳ if already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: () => resolve(api.request(originalRequest)),
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        // 🔄 refresh token call
        await refreshApi.post("/auth/refresh");

        // ✅ retry queued requests
        processQueue();

        // ✅ retry original request
        return api.request(originalRequest);
      } catch (err) {
        // ❌ refresh failed → reject all
        processQueue(err);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;