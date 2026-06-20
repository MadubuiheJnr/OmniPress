export const API_ENDPOINTS = {
  register: "/auth/register",
  verifyEmail: (token: string | null) => `/auth/verify-email?token=${token}`,
  login: "/auth/login",
  refresh: "/auth/refresh",
};
