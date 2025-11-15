import useAxios from "../../../hooks/useAxios";
import HeroCardWithBgImage from "./HeroCardWithBgImage";

const Sports = () => {
  const { data, isLoading } = useAxios({
    url: "/api/blogs?category=Sports&limit=1",
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {data?.map((blog) => (
        <HeroCardWithBgImage blog={blog} />
      ))}
    </>
  );
};

export default Sports;
