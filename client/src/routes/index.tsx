import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./auth-routes";
import AppLayout from "@/layouts/app-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <div>Home Page</div> }],
  },
  ...AuthRoutes,
]);
