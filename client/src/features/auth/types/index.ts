import type { ApiSuccessResponse } from "@/shared/types/api.types";

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterSuccessResponse extends ApiSuccessResponse {
  data: { email: string };
}
export interface VerifyEmailSuccessResponse extends ApiSuccessResponse {
  data: { callbackUrl: string };
}
