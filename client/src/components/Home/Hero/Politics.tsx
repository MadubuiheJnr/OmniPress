import useAxios from "../../../hooks/useAxios";
import HeroCardLoadingUI from "./HeroCardLoadingUI";
import HeroCardWithBgImage from "./HeroCardWithBgImage";

const Politics = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Politics&limit=1",
  });

  if (isLoading) return <HeroCardLoadingUI />;
  return (
    <>
      {data?.map((blog) => (
        <HeroCardWithBgImage blog={blog} />
      ))}
    </>
  );
};

export default Politics;
