export const AUTH_CACHE_KEYS = {
  ME: (id: string) => ["me", id],
  VERIFY_EMAIL: (token: string | null) => ["verify-email", token],
};
