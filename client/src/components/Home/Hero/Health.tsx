import useAxios from "../../../hooks/useAxios";
import HeroCardWithBgImage from "./HeroCardWithBgImage";

const Health = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Health&limit=1",
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data?.blogs.map((blog) => (
        <HeroCardWithBgImage blog={blog} />
      ))}
    </>
  );
};

export default Health;
