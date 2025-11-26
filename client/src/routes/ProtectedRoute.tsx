import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchPageLoadingUI from "../components/common/SearchPageLoadingUI";

type ProtectedRouteProps = {
  role?: "admin" | "user";
};

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <SearchPageLoadingUI />;
  if (!user) return <Navigate to={"/login"} replace />;

  if (role && user?.role !== role)
    return <Navigate to={"/unauthorized"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
