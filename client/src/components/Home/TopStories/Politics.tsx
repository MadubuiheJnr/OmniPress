import useAxios from "../../../hooks/useAxios";
import BlogCard from "../../common/BlogCard";

const Politics = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Politics&skip=0&limit=1&isFeatured=true",
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data?.map((blog) => (
        <BlogCard blog={blog} />
      ))}
    </div>
  );
};

export default Politics;
