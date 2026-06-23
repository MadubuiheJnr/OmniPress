import type { LoginDto, RegisterDto } from "../schemas";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import type {
  LoginSuccessResponse,
  RefreshSuccessResponse,
  RegisterSuccessResponse,
  VerifyEmailSuccessResponse,
} from "../types";
import { apiClient } from "@/infrastructure";

export const authService = {
  register: async (data: RegisterDto) => {
    const res = await apiClient.post<RegisterSuccessResponse>(
      API_ENDPOINTS.register,
      data,
    );
    return res.data;
  },
  verifyEmail: async (token: string) => {
    const res = await apiClient.get<VerifyEmailSuccessResponse>(
      API_ENDPOINTS.verifyEmail(token),
    );
    return res.data;
  },
  login: async (data: LoginDto) => {
    const res = await apiClient.post<LoginSuccessResponse>(
      API_ENDPOINTS.login,
      data,
    );
    return res.data;
  },
  refreshToken: async () => {
    const res = await apiClient.post<RefreshSuccessResponse>(
      API_ENDPOINTS.refresh,
    );
    return res.data;
  },
};
