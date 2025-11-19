import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  role?: "admin" | "user";
};

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={"/login"} replace />;

  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(user?.role))
        return <Navigate to={"/unauthorized"} replace />;
    } else {
      if (user?.role !== role) return <Navigate to={"/unauthorized"} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
