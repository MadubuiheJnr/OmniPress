import useAxios from "../../../hooks/useAxios";
import BlogCard from "../../common/BlogCard";

const World = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=World&skip=0&limit=1&isFeatured=true",
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data?.blogs.map((blog) => (
        <BlogCard blog={blog} useLg={true} />
      ))}
    </div>
  );
};

export default World;
