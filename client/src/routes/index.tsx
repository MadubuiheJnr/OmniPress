import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./auth-routes";
import AppLayout from "@/layouts/app-layout";
import PageNotFound from "@/shared/components/page-not-found";
import Home from "@/pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  ...AuthRoutes,
  { path: "*", element: <PageNotFound /> },
]);
