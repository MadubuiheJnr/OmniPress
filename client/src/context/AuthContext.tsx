import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Axios from "../config/axiosConfig";
import type { UserType } from "../types";

type AuthContextType = {
  user: UserType | null;
  logout: () => void;
  fetchUser: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    try {
      const res = await Axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    logout,
    fetchUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
