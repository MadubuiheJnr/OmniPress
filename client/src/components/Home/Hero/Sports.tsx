import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Sports = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Sports&limit=1",
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {data?.blogs.map((blog) => (
        <div key={blog._id} className=" flex items-center">
          <div
            style={{ backgroundImage: `url(${blog.thumbnail})` }}
            className="w-40 h-45 bg-position-[30%] bg-cover bg-no-repeat 
            lg:w-120 lg:h-55 lg:bg-size-[150%]"
          />
          <div
            className=" w-full h-45 p-3 flex flex-col justify-center
          lg:gap-y-2"
          >
            <span className="inline-block text-sm bg-red-700 text-zinc-50 px-5 py-1 font-bold tracking-wide self-start cursor-pointer">
              {blog.category.name}
            </span>
            <p className="text-zinc-800 text-base font-bold line-clamp-3 mt-2 cursor-pointer">
              <Link to={`/bog/${blog._id}`}>{blog.title}</Link>
            </p>
            <span className="inline-block text-gray-800 font-light text-sm">
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

export default Sports;
