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
export interface LoginSuccessResponse extends ApiSuccessResponse {
  data: { user: AuthUser; token: string };
}
export interface RefreshSuccessResponse extends ApiSuccessResponse {
  data: {
    user: AuthUser;
    token: string;
  };
}
