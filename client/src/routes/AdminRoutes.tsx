import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBlog from "../pages/admin/AddBlog";
import { AddBlogAction } from "./Actions/AddBlogAction";

const AdminRoutes = {
  element: <ProtectedRoute role="admin" />,
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "addblog", element: <AddBlog />, action: AddBlogAction },
      ],
    },
  ],
};

export default AdminRoutes;
