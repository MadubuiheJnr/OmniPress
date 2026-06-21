import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import type { VerifyEmailSuccessResponse } from "../types";
import type { ApiErrorResponse } from "@/shared/types/api.types";
import type { AxiosError } from "axios";

export const useVerifyEmailMutation = () => {
  return useMutation<
    VerifyEmailSuccessResponse,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: authService.verifyEmail,
    retry: false,
  });
};
