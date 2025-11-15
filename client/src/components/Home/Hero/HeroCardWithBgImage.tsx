import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Smile } from "lucide-react";
import type { BlogType } from "../../../types/blogTypes";

const HeroCardWithBgImage = ({
  blog,
  useLg = false,
}: {
  blog: BlogType;
  useLg?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundImage: `url(${blog.thumbnail})` }}
      className={`w-full h-110 bg-position-[100%] bg-cover bg-no-repeat rounded-3xl flex
          ${useLg && "lg:block lg:h-90"}`}
    >
      <div className="self-end bg-black/20 backdrop-blur-xs p-3 pt-5 rounded-3xl flex">
        <div className="self-end flex flex-col">
          <p className="bg-neutral-200/20 backdrop-blur-xs text-red-600 uppercase text-sm cursor-pointer self-start px-2 py-0.5">
            {blog.category.name}
          </p>
          <p className="text-neutral-50 text-base font-semibold mt-2 line-clamp-2">
            {blog.title}
          </p>
          <p className="inline-block text-neutral-100 font-light text-sm mt-2">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="mt-2">
            <div className="flex gap-x-3">
              <p className="flex items-center gap-x-1">
                <Clock className="text-neutral-100" size={25} />
                <span className="text-sm text-neutral-100 font-semibold">
                  {blog.readingTime}
                </span>
              </p>
              <p className="flex items-center gap-x-1">
                <Smile className="text-neutral-100" size={25} />
                <span className="text-sm text-neutral-100 font-semibold">
                  {blog.sentiment}
                </span>
              </p>
            </div>

            <button
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="w-55 pl-3 pr-2 py-2 mt-5 flex items-center justify-between gap-x-2 bg-neutral-50/20 backdrop-blur-xs rounded-full outline-none"
            >
              <span className="text-neutral-50 text-base font-bold">
                Continue reading
              </span>
              <span className="w-7 h-7 bg-neutral-500/20 backdrop-blur-xs rounded-full flex items-center justify-center">
                <ArrowRight className="text-neutral-50" size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCardWithBgImage;
