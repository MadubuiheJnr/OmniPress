import { useNavigate } from "react-router-dom";
import type { BlogType } from "../../types/blogTypes";
import { Clock, Smile } from "lucide-react";

const SuggestedBlogCard = ({ blog }: { blog: BlogType }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${blog.thumbnail})` }}
      className={`w-full h-100 bg-center bg-cover bg-no-repeat rounded-4xl flex`}
    >
      <div className="w-full bg-white/10 backdrop-blur-xs p-5 pt-5 rounded-b-4xl self-end flex flex-col">
        <p className="text-neutral-50 text-xs font-semibold bg-white/5 backdrop-blur-xs self-start px-4 py-0.5 uppercase">
          {blog.category.name}
        </p>
        <p className="text-neutral-50 text-sm font-bold tracking-wider line-clamp-2 mt-2">
          {blog.title}
        </p>
        <p className="inline-block text-neutral-400 font-semibold text-xs mt-1">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p className="flex items-center gap-x-1 mt-1">
          <Clock className="text-neutral-200" size={15} />
          <span className="text-xs text-neutral-200">{blog.readingTime}</span>
        </p>

        <button
          onClick={() => navigate(`/blog/${blog._id}`)}
          className="bg-black/10 text-neutral-50 backdrop-blur-lg px-4 py-1.5 rounded-lg text-sm font-bold cursor-pointer mt-5"
        >
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default SuggestedBlogCard;
