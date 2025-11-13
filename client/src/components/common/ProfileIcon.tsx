import { ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfileIcon = () => {
  const { user } = useAuth();
  return (
    <div className="inline-flex items-center gap-3 bg-gray-100/50 px-1 py-1 pr-3 rounded-full">
      <img src={user?.avatar || "/user_icon.svg"} alt="" className="w-7" />
      <p className="inline-flex flex-col">
        <span className="text-neutral-500 font-semibold text-sm">
          {user?.userName}
        </span>
        <span className="text-neutral-800 text-xs hidden">{user?.email}</span>
      </p>

      <span>
        <ChevronDown className="text-neutral-700" size={20} />
      </span>
    </div>
  );
};

export default ProfileIcon;
