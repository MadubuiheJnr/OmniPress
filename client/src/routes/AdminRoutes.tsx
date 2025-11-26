import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBlog from "../pages/admin/AddBlog";
import { AddBlogAction } from "./Actions/AddBlogAction";
import Comments from "../pages/admin/Comments";
import Users from "../pages/admin/Users";
import UserDetails from "../pages/admin/UserDetails";
import Blogs from "../pages/admin/Blogs";
import AdminBlogDetails from "../pages/admin/AdminBlogDetails";

const AdminRoutes = {
  element: <ProtectedRoute role="admin" />,
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "addblog", element: <AddBlog />, action: AddBlogAction },
        { path: "comments", element: <Comments /> },
        { path: "users", element: <Users /> },
        { path: "user/:id", element: <UserDetails /> },
        { path: "blogs", element: <Blogs /> },
        { path: "/admin/blog/:id", element: <AdminBlogDetails /> },
      ],
    },
  ],
};

export default AdminRoutes;
