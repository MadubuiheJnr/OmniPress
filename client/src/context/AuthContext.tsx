import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Axios from "../config/axiosConfig";
import type { UserType } from "../types";
import type { AxiosError } from "axios";

type AuthContextType = {
  user: UserType | null;
  logout: () => void;
  fetchUser: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await Axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    logout,
    fetchUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
