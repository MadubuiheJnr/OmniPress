import { ChevronDown, ChevronUp, Clock, Smile } from "lucide-react";
import type { BlogType } from "../../types/blogTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchCard = ({ blog }: { blog: BlogType }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full p-3 rounded-4xl bg-white drop-shadow-xs drop-shadow-neutral-300 transition-all duration-300 ease-in-out">
        <div
          style={{ backgroundImage: `url(${blog.thumbnail})` }}
          className={`w-full h-55 bg-position-[100%] bg-cover bg-no-repeat rounded-4xl flex`}
        >
          <div className="self-end flex justify-end p-5 w-full">
            <button
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white/10 text-neutral-50 backdrop-blur-xs px-4 py-1.5 rounded-lg text-sm font-bold cursor-pointer"
            >
              Start Reading
            </button>
          </div>
        </div>

        <div className="w-full p-2 mt-5">
          <div>
            <span className="bg-neutral-600/10 text-base text-red-600 px-3 py-0.5 backdrop-blur-xs cursor-pointer">
              {blog.category.name}
            </span>
            <p className="truncate text-neutral-900 font-semibold py-1 mt-1">
              {blog.title}
            </p>

            <div className="flex gap-x-3 py-2">
              <p className="flex items-center gap-x-1">
                <Clock className="text-neutral-500" size={20} />
                <span className="text-sm text-neutral-600 font-semibold">
                  {blog.readingTime}
                </span>
              </p>
              <p className="flex items-center gap-x-1">
                <Smile className="text-neutral-500" size={20} />
                <span className="text-sm text-neutral-600 font-semibold">
                  {blog.sentiment}
                </span>
              </p>
            </div>
          </div>

          {open && (
            <p
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="line-clamp-8 mt-2 text-sm font-light text-"
            />
          )}
        </div>

        <p
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center mt-3 transition-all duration-300 ease-in-out"
        >
          {open ? (
            <ChevronUp className="text-neutral-400" size={30} />
          ) : (
            <ChevronDown className="text-neutral-400" size={30} />
          )}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
