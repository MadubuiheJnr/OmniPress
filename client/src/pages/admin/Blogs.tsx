import type { AxiosError } from "axios";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { BlogType } from "../../types/blogTypes";
import AdminBlogCard from "../../components/admin/Blog/AdminBlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const fetchBlogs = async () => {
    try {
      const res = await Axios("/api/blogs/admin");
      setBlogs(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="w-full p-3 h-screen overflow-y-auto pb-25">
      <div className="w-70 flex flex-col gap-y-5">
        {blogs.length > 0
          ? blogs.map((blog) => <AdminBlogCard blog={blog} />)
          : null}
      </div>
    </div>
  );
};

export default Blogs;
