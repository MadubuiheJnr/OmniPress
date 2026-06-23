import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./auth-routes";
import AppLayout from "@/layouts/app-layout";
import PageNotFound from "@/shared/components/page-not-found";
import Home from "@/pages/home";
import { RouteGuard } from "./route-guard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "articles", element: <div>Articles</div> },
        ],
      },
    ],
  },
  ...AuthRoutes,
  { path: "*", element: <PageNotFound /> },
]);
