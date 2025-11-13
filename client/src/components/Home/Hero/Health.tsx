import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Health = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Health&limit=1",
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data?.blogs.map((blog) => (
        <div
          key={blog._id}
          style={{ backgroundImage: `url(${blog.thumbnail})` }}
          className="w-full h-64 bg-position-[50%] bg-cover bg-no-repeat
          lg:h-115 lg:w-170"
        >
          <div
            className="bg-linear-to-t from-zinc-950 to-95% to-zinc-50/10 w-full h-64 p-5 flex flex-col justify-end-safe
          lg:h-115 lg:w-170"
          >
            <span className="inline-block text-sm bg-red-700 text-zinc-50 px-5 py-1 font-bold tracking-wide mt-20 self-start cursor-pointer">
              {blog.category.name}
            </span>
            <p className="text-zinc-50 text-base font-bold line-clamp-3 mt-2 cursor-pointer">
              <Link to={`/bog/${blog._id}`}>{blog.title}</Link>
            </p>
            <span className="inline-block text-gray-200 font-light text-sm">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Health;
