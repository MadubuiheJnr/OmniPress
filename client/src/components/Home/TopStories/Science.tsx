import useAxios from "../../../hooks/useAxios";
import BlogCardWithBgImage from "../../common/BlogCardWithBgImage";

const Science = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Science&skip=0&limit=1&isFeatured=true",
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data?.blogs.map((blog) => (
        <BlogCardWithBgImage blog={blog} />
      ))}
    </div>
  );
};

export default Science;
