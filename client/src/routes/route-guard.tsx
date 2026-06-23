import { useRefreshToken } from "@/features/auth";
import { FullScreenLoader } from "@/shared/components/full-screen-loader";
import { useAuthStore } from "@/shared/store/global.auth.store";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export const RouteGuard = () => {
  const { isLoading, setLoading, token } = useAuthStore();
  const { mutate: refresh } = useRefreshToken();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && !token) {
      hasInitialized.current = true;
      setLoading(true);
      refresh();
    }
  }, [refresh, setLoading, token]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <Outlet />;
};
