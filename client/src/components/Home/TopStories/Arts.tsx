import useAxios from "../../../hooks/useAxios";
import BlogCard from "../../common/BlogCard";

const Arts = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Arts&skip=0&limit=1&isFeatured=true",
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

export default Arts;
