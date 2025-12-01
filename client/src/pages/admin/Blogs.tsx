import type { AxiosError } from "axios";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { BlogType } from "../../types/blogTypes";
import { Plus, Search } from "lucide-react";
import SearchPageLoadingUI from "../../components/common/SearchPageLoadingUI";
import BlogTableItems from "../../components/admin/Blog/BlogTableItems";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleShowActions = (currentID: string) => {
    setSelected(currentID === selected ? null : currentID);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await Axios("/api/blogs/admin");
      setBlogs(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="p-2 lg:w-[95%]">
      <div className=" text-neutral-800">
        <p className="font-semibold text-sm">Manage Blogs</p>
        <p className="font-light text-xs">
          View, edit, feature and organize all published and draft blog post.
        </p>
      </div>

      <div className="mt-5">
        <div className="w-full h-9 border border-neutral-200 rounded-full flex items-center gap-2 pl-2 pr-3 py-1">
          <Search size={20} className="text-neutral-500" />
          <input
            type="text"
            className="flex-1 h-full outline-0 text-xs text-neutral-600"
            placeholder="search blogs"
          />
        </div>
        <button
          onClick={() => navigate(`/admin/addblog`)}
          className="text-sm text-neutral-800 border border-neutral-200 rounded-sm px-3 py-1 font-semibold mt-3 flex items-center gap-x-2"
        >
          <Plus className="inline text-neutral-800" size={20} /> Create Blog
        </button>
      </div>

      <div className="w-full overflow-x-auto mt-5 border border-neutral-200 rounded-lg">
        <table className="min-w-max w-full">
          <thead className="text-left uppercase border-b border-neutral-200">
            <tr className="w-full text-xs text-neutral-500">
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-3 py-3">
                Category
              </th>
              <th scope="col" className="px-3 py-3">
                Published
              </th>

              <th scope="col" className="px-3 py-3">
                Featured
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <tr>
                <td>
                  <SearchPageLoadingUI open={loading} />
                </td>
              </tr>
            ) : (
              blogs &&
              blogs.map((blog, index) => (
                <BlogTableItems
                  blog={blog}
                  index={index + 1}
                  selected={selected}
                  setSelected={handleShowActions}
                  closeSelected={() => setSelected(null)}
                  refetchBlogs={fetchBlogs}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
