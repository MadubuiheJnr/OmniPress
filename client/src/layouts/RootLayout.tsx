import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  const hide = ["/profile", "/search"];

  const shouldHide = hide.some((route) => location.pathname.startsWith(route));
  return (
    <div className="space-y-6">
      {!shouldHide && <Navbar />}
      <Outlet />
      {!shouldHide && <Footer />}
    </div>
  );
};

export default RootLayout;
