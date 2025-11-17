import RootLayout from "../layouts/RootLayout";
import About from "../pages/About";
import Arts from "../pages/Arts";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import Business from "../pages/Business";
import Contact from "../pages/Contact";
import Health from "../pages/Health";
import Home from "../pages/Home";
import Politics from "../pages/Politics";
import Science from "../pages/Science";
import Search from "../pages/Search";
import Sports from "../pages/Sports";
import UserProfilePage from "../pages/UserProfilePage";
import World from "../pages/World";
import { ArtsPageLoader } from "./loaders/ArtsPageLoader";
import { BlogDetailsLoader } from "./loaders/BlogDetailsLoader";
import { BusinessPageLoader } from "./loaders/BusinessPageLoader";
import { HealthPageLoader } from "./loaders/HealthPageLoader";
import { PoliticsPageLoader } from "./loaders/PoliticsPageLoader";
import { SciencePageLoader } from "./loaders/SciencePageLoader";
import { SportsPageLoader } from "./loaders/SportsPageLoader";
import { WorldPageLoader } from "./loaders/WorldPageLoader";

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
    {
      path: "/world",
      element: <World />,
      loader: WorldPageLoader,
    },
    {
      path: "/science",
      element: <Science />,
      loader: SciencePageLoader,
    },
    {
      path: "/arts",
      element: <Arts />,
      loader: ArtsPageLoader,
    },
    {
      path: "/business",
      element: <Business />,
      loader: BusinessPageLoader,
    },
    {
      path: "/politics",
      element: <Politics />,
      loader: PoliticsPageLoader,
    },
    {
      path: "/sports",
      element: <Sports />,
      loader: SportsPageLoader,
    },
    {
      path: "/health",
      element: <Health />,
      loader: HealthPageLoader,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ],
};

export default UserRoutes;
