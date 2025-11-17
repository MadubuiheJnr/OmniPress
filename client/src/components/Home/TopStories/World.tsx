import useAxios from "../../../hooks/useAxios";
import BlogCard from "../../common/BlogCard";
import BlogCardLoadingUI from "../../common/BlogCardLoadingUI";

const World = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=World&skip=0&limit=1&isFeatured=true",
  });
  if (isLoading) return <BlogCardLoadingUI useLg={true} />;
  return (
    <div>
      {data?.map((blog) => (
        <BlogCard blog={blog} useLg={true} />
      ))}
    </div>
  );
};

export default World;
