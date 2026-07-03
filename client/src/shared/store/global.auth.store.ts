import { create } from "zustand";
import type { AuthUser } from "../types/user.types";

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  setLoading: (param: boolean) => void;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
}));
