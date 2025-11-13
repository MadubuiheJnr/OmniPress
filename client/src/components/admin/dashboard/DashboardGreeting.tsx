import { Plus } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardGreeting = () => {
  const { user } = useAuth();
  return (
    <div className="lg:flex justify-between items-center">
      <div>
        <p
          className="text-neutral-900 text-lg font-semibold
        lg:text-xl"
        >
          Hey {user?.userName}, good to see you!
        </p>
        <p
          className="text-neutral-800 text-sm font-light tracking-wider
        lg:text-base"
        >
          Manage your content and users from here
        </p>
      </div>

      <Link to="/admin/addblog">
        <button className="inline-flex items-center gap-x-2 bg-neutral-950 text-neutral-50 pl-3 py-1.5 pr-5 rounded-full mt-5">
          <Plus className="inline" size={20} />
          <span className="text-sm font-semibold">Create blog</span>
        </button>
      </Link>
    </div>
  );
};

export default DashboardGreeting;
