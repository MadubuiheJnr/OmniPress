import { Clock } from "lucide-react";
import type { BlogType } from "../../../types/blogTypes";

const AdminBlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="bg-neutral-50 drop-shadow-neutral-300s drop-shadow-sm p-1 rounded-2xl">
      <div className="relative">
        <img
          src={blog.thumbnail}
          alt=""
          className="w-70 h-70 object-cover rounded-2xl"
        />

        <div className="absolute top-0 left-0 w-full p-3">
          <span className="px-2 py-1 bg-black/20 backdrop-blur-xs text-neutral-50 text-xs font-semibold inline-flex items-center gap-x-1 rounded-full">
            <Clock size={15} />
            {blog.readingTime}
          </span>
        </div>
      </div>

      <div className="p-2 mt-3">
        <p className="truncate text-sm text-neutral-900 font-bold">
          {blog.title}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="line-clamp-2 text-xs text-neutral-900 mt-0.5 font-normal"
        ></p>

        <button className="mt-3 px-5 py-1 text-neutral-100 bg-neutral-900 text-xs font-extrabold rounded-full">
          See more
        </button>
      </div>
    </div>
  );
};

export default AdminBlogCard;
