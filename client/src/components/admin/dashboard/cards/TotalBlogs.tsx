import type { AxiosError } from "axios";
import Axios from "../../../../config/axiosConfig";
import type { BlogType } from "../../../../types/blogTypes";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, NotebookPen } from "lucide-react";

const TotalBlogs = () => {
  const [blogsData, setBlogsData] = useState<BlogType[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await Axios("/api/blogs/admin");
      setBlogsData(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalBlogs = blogsData.length;

  return (
    <div className="bg-white p-3 rounded-xl drop-shadow-xs border border-gray-200/50 transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-800 text-lg">Total Blogs</p>
          <p className="text-neutral-900 text-3xl font-bold">{totalBlogs}</p>
        </div>
        <div className="w-15 h-15 bg-emerald-100/50 flex items-center justify-center rounded-xl">
          <NotebookPen className="text-emerald-600" size={25} />
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <span>
          {totalBlogs > 50 ? (
            <ArrowUpRight className="text-emerald-600" size={20} />
          ) : (
            <ArrowDownRight className="text-red-600" size={20} />
          )}
        </span>
        <p className="text-lg font-semibold">
          {totalBlogs > 50 ? (
            <span className="text-emerald-600">+</span>
          ) : (
            <span className="text-red-600">-</span>
          )}
          <span
            className={`${
              totalBlogs > 50 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {totalBlogs}%
          </span>
        </p>
      </div>

      <div className="w-full h-3 bg-neutral-100 rounded-full mt-5">
        <div
          className={`w-[50%] h-full bg-linear-to-r from-emerald-500 to-emerald-800 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default TotalBlogs;
