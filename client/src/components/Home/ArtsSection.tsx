import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { ArrowRight } from "lucide-react";
import BlogCard from "../common/BlogCard";

const ArtsSection = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Arts&limit=3",
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
          <span className="font-semibold text-zinc-900 text-base">Arts</span>
          <span
            className="w-40 h-px bg-zinc-700
          lg:w-267"
          />
        </p>

        <Link to="/science" className="flex text-red-700 font-semibold text-sm">
          <span>View all</span>
          <ArrowRight size={20} className="ml-0.5" />
        </Link>
      </div>

      <div
        className="mt-10 grid gap-y-10
      lg:grid-cols-4"
      >
        {data ? data.map((blog) => <BlogCard blog={blog} />) : null}
      </div>
    </div>
  );
};

export default ArtsSection;
