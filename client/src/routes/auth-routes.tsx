import { type RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/auth-layout";
import Login from "@/pages/auth/login";

const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <div>Register Page</div> },
    ],
  },
];

export default AuthRoutes;
