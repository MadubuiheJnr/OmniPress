import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./auth-routes";
import AppLayout from "@/layouts/app-layout";
import PageNotFound from "@/shared/components/page-not-found";
import Home from "@/pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "articles",
        element: <div>Articles</div>,
      },
      {
        path: "articles/abc/def/ghi",
        element: <div>Articles</div>,
      },
    ],
  },
  ...AuthRoutes,
  { path: "*", element: <PageNotFound /> },
]);
