import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/shared/store/global.auth.store";
import type { RefreshSuccessResponse } from "../types";
import type { ApiErrorResponse } from "@/shared/types/api.types";
import type { AxiosError } from "axios";

export const useRefreshToken = () => {
  const { setAuth, clearAuth, setLoading } = useAuthStore();

  return useMutation<RefreshSuccessResponse, AxiosError<ApiErrorResponse>>({
    mutationFn: authService.refreshToken,
    retry: false,
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.token);
    },
    onError: () => {
      clearAuth();
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};
