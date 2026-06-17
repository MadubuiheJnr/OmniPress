import axios, { type AxiosInstance } from "axios";
import { env } from "./env";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${env?.VITE_API_BASE_URL}`,
  timeout: 10000,
});

export default apiClient;
