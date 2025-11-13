import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { ArrowRight } from "lucide-react";
import BlogCard from "../common/BlogCard";

const WorldSection = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=World&limit=4",
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div
      className="p-5 mt-10
    lg:w-[90%] lg:mx-auto"
    >
      <div className="flex items-center gap-x-3">
        <p className="w-[3px] h-6 bg-red-700" />
        <p className="flex items-center gap-x-3">
          <span className="font-semibold text-neutral-800 text-base">
            World
          </span>
          <span
            className="w-44 h-px bg-neutral-400
          lg:w-267"
          />
        </p>

        <Link to="/health" className="flex text-red-700 font-semibold text-sm">
          <span>View all</span>
          <ArrowRight size={20} className="ml-0.5" />
        </Link>
      </div>

      <div
        className="mt-10 grid gap-y-10
      lg:grid-cols-4 gap-x-3"
      >
        {data ? data.blogs.map((blog) => <BlogCard blog={blog} />) : null}
      </div>
    </div>
  );
};

export default WorldSection;
