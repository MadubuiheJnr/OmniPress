import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { AUTH_CACHE_KEYS } from "../constants/cache-keys";
import type { VerifyEmailSuccessResponse } from "../types";
import type { ApiErrorResponse } from "@/shared/types/api.types";
import type { AxiosError } from "axios";

export const useVerifyEmailQuery = (token: string | null) => {
  return useQuery<VerifyEmailSuccessResponse, AxiosError<ApiErrorResponse>>({
    queryKey: AUTH_CACHE_KEYS.VERIFY_EMAIL(token),
    queryFn: () => authService.verifyEmail(token),
    enabled: !!token,
    retry: false,
  });
};
