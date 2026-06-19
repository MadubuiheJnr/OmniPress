import apiClient from "@/infrastructure/api/api-client";
import type { RegisterDto } from "../schemas";
import { API_ENDPOINTS } from "../constants/api-endpoints";
import type { RegisterSuccessResponse } from "../types";

export const authService = {
  register: async (data: RegisterDto) => {
    const res = await apiClient.post<RegisterSuccessResponse>(
      API_ENDPOINTS.register,
      data,
    );
    return res.data;
  },
};
