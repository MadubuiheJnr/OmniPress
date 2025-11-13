import { ArrowRight, Clock, Moon } from "lucide-react";
import type { BlogType } from "../../types/blogTypes";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  blog,
  showContent = false,
  useLg = false,
}: {
  blog: BlogType;
  showContent?: boolean;
  useLg?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full bg-white drop-shadow-gray-300 drop-shadow-lg p-3 rounded-3xl
    ${useLg ? "lg:flex lg:w-150 lg:items-center lg:gap-x-5" : ""}`}
    >
      <img
        src={blog.thumbnail}
        alt={`${blog.category.name} image`}
        className={`rounded-3xl h-90 w-80 object-cover transition-all duration-300
          ${useLg && "lg:w-60 lg:h-70"}`}
      />

      <div className="mt-5">
        <p className="text-red-600 uppercase text-sm cursor-pointer">
          {blog.category.name}
        </p>
        <p className="text-neutral-950 text-base font-semibold mt-2 line-clamp-2">
          {blog.title}
        </p>
        <p className="inline-block text-neutral-500 font-light text-sm mt-2">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className={`${!showContent ? "hidden" : "line-clamp-3 mt-2"}`}
        />
        <div className="mt-2">
          <div className="flex gap-x-3">
            <p className="flex items-center gap-x-1">
              <Clock className="text-neutral-500" size={25} />
              <span className="text-sm text-neutral-700 font-semibold">
                {blog.readingTime}
              </span>
            </p>
            <p className="flex items-center gap-x-1">
              <Moon className="text-neutral-500" size={25} />
              <span className="text-sm text-neutral-700 font-semibold">
                {blog.sentiment}
              </span>
            </p>
          </div>

          <button
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="w-50 pl-3 pr-2 py-2 mt-5 flex items-center justify-between gap-x-2 bg-neutral-950 rounded-full outline-none"
          >
            <span className="text-neutral-50 text-base">Continue reading</span>
            <span className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center">
              <ArrowRight className="text-neutral-500" size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
