import useAxios from "../../../hooks/useAxios";
import BlogCardLoadingUI from "../../common/BlogCardLoadingUI";
import BlogCardWithBgImage from "../../common/BlogCardWithBgImage";

const Science = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Science&skip=0&limit=1&isFeatured=true",
  });
  if (isLoading) return <BlogCardLoadingUI useLg={true} />;
  return (
    <div>
      {data?.map((blog) => (
        <BlogCardWithBgImage blog={blog} />
      ))}
    </div>
  );
};

export default Science;
