import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, LogIn, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfileIcon = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    navigate(slug);
    setOpen(false);
  };
  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <img
          src={(isAuthenticated && user?.avatar) || "/user_icon.svg"}
          alt=""
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>

      {open && (
        <div className="w-60 absolute right-3 top-20 z-10 bg-blue-700/5 backdrop-blur-sm rounded-2xl transition-all duration-300 ease-in-out">
          <div className="w-full bg-neutral-900/20 backdrop-blur-6xl rounded-2xl px-2 py-3 flex flex-col gap-y-1">
            <div
              onClick={() => handleClick("/profile")}
              className="flex items-center gap-x-5 py-2 px-4 rounded-2xl hover:bg-neutral-50/5 cursor-pointer hover:backdrop-blur-xs"
            >
              <User2 className="text-neutral-50" size={20} />
              <p className="text-neutral-50 text-sm font-semibold">
                View Profile
              </p>
            </div>

            {isAdmin && (
              <div
                onClick={() => handleClick("/admin")}
                className="flex items-center gap-x-5 py-2 px-4 rounded-2xl hover:bg-neutral-50/5 cursor-pointer hover:backdrop-blur-xs"
              >
                <LayoutDashboard className="text-neutral-50" size={20} />
                <p className="text-neutral-50 text-sm font-semibold">
                  View Dashboard
                </p>
              </div>
            )}

            <button
              onClick={logout}
              className=" flex items-center gap-x-5 py-2 px-4 rounded-2xl hover:bg-neutral-50/5 cursor-pointer hover:backdrop-blur-xs "
            >
              <LogIn className="inline text-neutral-50" size={20} />
              <span className="text-neutral-50 text-sm font-semibold">
                Log out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;
