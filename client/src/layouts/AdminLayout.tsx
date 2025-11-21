import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../components/admin/Navbar/AdminNavbar";
import AdminSidebar from "../components/admin/Navbar/AdminSidebar";

const AdminLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/admin/addblog"];

  const shouldHideSidebar = hideSidebarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <div className=" h-screen relative">
      <header className="fixed top-0 z-50 w-full">
        <AdminNavbar />
      </header>
      <div
        className={`mt-20 ${
          !shouldHideSidebar &&
          `flex items-start h-[calc(100vh-70px)] 
      lg:mt-25 lg:gap-x-10`
        }`}
      >
        {!shouldHideSidebar && (
          <div>
            <AdminSidebar />
          </div>
        )}

        <div className="lg:w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
