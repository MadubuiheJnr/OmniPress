import { Star } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import SearchCard from "./SearchCard";

const SearchRecommendedBlogs = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?isFeatured=true&limit=10",
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <p className="flex items-center gap-x-2 mb-5 text-neutral-800 ">
        <span>
          <Star size={25} />
        </span>
        <span className="text-base font-semibold border-b border-neutral-700/30">
          Recommended Blogs
        </span>
      </p>

      <div className="grid grid-cols-1 gap-5">
        {data ? data.blogs.map((blog) => <SearchCard blog={blog} />) : null}
      </div>
    </div>
  );
};

export default SearchRecommendedBlogs;
