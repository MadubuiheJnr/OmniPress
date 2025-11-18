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
  loading: boolean;
  // login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
      localStorage.removeItem("token");
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
  }, [user]);

  // const login = async (identifier: string, password: string) => {
  //   try {
  //     const res = await Axios.post(
  //       "api/auth/login",
  //       { identifier, password },
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     localStorage.setItem("token", res.data.token);
  //     await fetchUser();
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    logout,
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
