import {
  Facebook,
  Instagram,
  Sparkles,
  SunMedium,
  ThumbsDown,
  ThumbsUp,
  Twitter,
  Youtube,
} from "lucide-react";
import type { BlogType } from "../../types/blogTypes";
import AddComment from "./AddComment";

const BlogDetails = ({ data }: { data: BlogType }) => {
  return (
    <div className="lg:w-[80%] lg:mx-auto">
      <div>
        <p className="text-xl font-bold text-zinc-900">{data.title}</p>
        <p className="mt-2 flex gap-x-2">
          <span className="text-lg font-light text-zinc-700s">
            By {data.author.name} <span>|</span>
          </span>
          <div className="flex items-center gap-x-3">
            <span className="group">
              {data.author.social?.medium ? (
                <SunMedium className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {data.author.social?.x ? (
                <Twitter className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {!data.author.social?.fb ? (
                <Facebook className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {!data.author.social?.ig ? (
                <Instagram className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
            <span className="group">
              {!data.author.social?.yt ? (
                <Youtube className="transition-transform duration-300 group-hover:scale-110 text-zinc-900" />
              ) : null}
            </span>
          </div>
        </p>

        <p className="text-sm font-normal text-zinc-600 mt-2">
          {new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <button className=" bg-neutral-800 text-zinc-50 text-sm font-semibold px-3 py-1.5 mt-5 rounded-lg">
          Summarize <Sparkles className="inline ml-1" size={20} />
        </button>
      </div>

      <div className="mt-15">
        <img
          src={data.thumbnail}
          alt=""
          className="w-full object-cover  transition-transform duration-300 hover:scale-105"
        />

        <p
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="mt-5 text-zinc-800"
        ></p>
      </div>

      <div className="mt-3 inline-flex items-center gap-x-5 bg-gray-100 px-5 py-2.5 rounded-full">
        <p className="flex items-center gap-x-2 cursor-pointer">
          <ThumbsUp className="text-zinc-900" size={20} />
          <span className="text-base font-semibold text-zinc-900">
            {data.likesCount}
          </span>
        </p>
        <span className="w-px h-5 bg-gray-400" />
        <p className="flex items-center gap-x-2 cursor-pointer">
          <ThumbsDown className="text-zinc-900" size={20} />
          <span className="text-base font-semibold text-zinc-900">
            {data.dislikesCount}
          </span>
        </p>
      </div>

      {/* Add Comment */}
      <div className="mt-20">
        <AddComment blogID={data._id} />
      </div>
    </div>
  );
};

export default BlogDetails;
