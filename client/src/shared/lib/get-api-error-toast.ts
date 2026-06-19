import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api.types";

export function getApiErrorToast(error: unknown) {
  const err = error as AxiosError<ApiErrorResponse>;
  return {
    title: err.response?.data.error.title ?? "Something went wrong",
    description: err.response?.data.error.detail ?? "Please try again.",
  };
}
