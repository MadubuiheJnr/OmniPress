import RootLayout from "../layouts/RootLayout";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import Home from "../pages/Home";
import Search from "../pages/Search";
import UserProfilePage from "../pages/UserProfilePage";
import { BlogDetailsLoader } from "./loaders/BlogDetailsLoader";

const UserRoutes = {
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "/about", element: <Home /> },
    {
      path: "/blog/:id",
      element: <BlogDetailsPage />,
      loader: BlogDetailsLoader,
    },
    {
      path: "/profile",
      element: <UserProfilePage />,
    },
    {
      path: "/search",
      element: <Search />,
    },
  ],
};

export default UserRoutes;
