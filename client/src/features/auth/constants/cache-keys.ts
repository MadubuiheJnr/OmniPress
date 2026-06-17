export const AUTH_CACHE_KEYS = {
  ME: (id: string) => ["me", id],
  TOKEN: () => [...AUTH_CACHE_KEYS.ME(id), "token"],
};
