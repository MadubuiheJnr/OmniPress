import BlogPublicationChart from "./BlogPublicationChart";
import FeaturedBlogChart from "./FeaturedBlogChart";

const DashboardCharts = () => {
  return (
    <div
      className="mt-10 grid grid-cols-1 gap-5
    lg:grid-cols-3"
    >
      <BlogPublicationChart />
      <FeaturedBlogChart />
    </div>
  );
};

export default DashboardCharts;
