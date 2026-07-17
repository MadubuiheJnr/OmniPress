import { type RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/auth-layout";
import Register from "@/pages/auth/register";
import { VerifyEmail } from "@/pages/auth/verify-email";
import Login from "@/pages/auth/login";

const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
    ],
  },
];

export default AuthRoutes;
