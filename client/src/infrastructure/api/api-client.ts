import { env } from "@/config";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${env?.VITE_API_BASE_URL}`,
  timeout: 10000,
});

let token: string | null;
let setToken: (t: string) => void;

export const injectAuthBinding = (
  storeToken: string | null,
  setStoreToken: (t: string) => void,
) => {
  token = storeToken;
  setToken = setStoreToken;
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<
  [(resolve: PromiseResolve, reject: PromiseReject) => void]
> = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until the refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post("/auth/refresh");
        const { newToken } = data.token;

        setToken(newToken);
        apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        processQueue(null, newToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Redirect to login or emit an event
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
