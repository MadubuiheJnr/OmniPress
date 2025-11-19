import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
const App = () => {
  const router = createBrowserRouter([
    ...Routes,
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <PageNotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
