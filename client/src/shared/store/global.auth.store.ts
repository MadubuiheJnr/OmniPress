import { injectAuthBinding } from "@/infrastructure";
import { create } from "zustand";

interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
}));

injectAuthBinding(useAuthStore.getState().token, (newToken) =>
  useAuthStore.setState({ token: newToken }),
);
