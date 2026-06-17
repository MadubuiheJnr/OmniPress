import { type RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/auth-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];

export default AuthRoutes;
