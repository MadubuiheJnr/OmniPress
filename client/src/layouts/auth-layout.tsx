import { useAuthStore } from "@/shared/store/global.auth.store";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/", { replace: true });
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
