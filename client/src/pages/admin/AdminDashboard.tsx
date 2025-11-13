import DashboardCards from "../../components/admin/dashboard/cards/DashboardCards";
import DashboardCharts from "../../components/admin/dashboard/charts/DashboardCharts";
import DashboardGreeting from "../../components/admin/dashboard/DashboardGreeting";

const AdminDashboard = () => {
  return (
    <div className="p-3 h-screen overflow-y-auto pb-25">
      <DashboardGreeting />

      <div className="lg:mt-15">
        <DashboardCards />
        <DashboardCharts />
      </div>
    </div>
  );
};

export default AdminDashboard;
