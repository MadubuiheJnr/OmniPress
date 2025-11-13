import ActiveUsers from "./ActiveUsers";
import TotalBlogs from "./TotalBlogs";

const DashboardCards = () => {
  return (
    <div
      className="mt-5 grid grid-cols-1 gap-3
    lg:grid-cols-4"
    >
      <TotalBlogs />

      <ActiveUsers />
    </div>
  );
};

export default DashboardCards;
