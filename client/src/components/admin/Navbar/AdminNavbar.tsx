import { NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import NavListData from "./NavListData";
import UserProfileIcon from "../../common/UserProfileIcon";

const AdminNavbar = () => {
  return (
    <div className="p-5 flex items-center justify-between bg-white/20 backdrop-blur-2xl">
      <div className="">
        <img src="/favicon.png" alt="" className="w-10 hidden" />
        <Logo styles="text-lg font-bold" />
      </div>

      <nav
        className={`hidden lg:inline-flex items-center bg-gray-100/50 rounded-full`}
      >
        {NavListData.map((nav) => (
          <NavLink
            to={`${nav.slug}`}
            end
            className={({
              isActive,
            }) => `flex items-center gap-2 px-5 py-3 rounded-full text-sm transition-all ease-in-out duration-300 last-of-type:pr-5
            ${isActive ? "bg-neutral-950" : "bg-transparent"}
              `}
          >
            {({ isActive }) => (
              <span
                className={`font-normal ${
                  isActive ? " text-neutral-50" : " text-neutral-900"
                } `}
              >
                {nav.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div>
        <UserProfileIcon />
      </div>
    </div>
  );
};

export default AdminNavbar;
