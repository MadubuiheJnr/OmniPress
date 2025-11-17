import useAxios from "../../../hooks/useAxios";
import BlogCard from "../../common/BlogCard";
import BlogCardLoadingUI from "../../common/BlogCardLoadingUI";

const Arts = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Arts&skip=0&limit=1&isFeatured=true",
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

export default Arts;
