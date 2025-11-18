import { useState } from "react";
import Logo from "../common/Logo";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import NavLinks from "./NavLinks";
import LoginButton from "../common/LoginButton";
import { useAuth } from "../../context/AuthContext";
import UserProfileIcon from "../common/UserProfileIcon";
import SearchButton from "../Search/SearchButton";
import NavSocialMedia from "./NavSocialMedia";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="">
      <div
        className="w-full flex justify-between items-center border-b border-neutral-500 px-3 py-4
      lg:px-30 lg:py-6"
      >
        <div className="hidden lg:inline-block">
          <NavSocialMedia />
        </div>

        <Logo
          styles=" h-full cursor-pointer w-35 text-2xl font-semibold
        lg:text-3xl"
        />

        <div
          className="flex items-center gap-x-4
        lg:gap-x-5"
        >
          <SearchButton />

          {user ? (
            <UserProfileIcon />
          ) : (
            // user.role === "admin" ? (
            //   "Dashboard"
            // ) : (
            //   <ProfileIcon />
            // )
            <LoginButton />
          )}

          <button
            onClick={() => setOpen(!open)}
            className=" border border-red-600 p-1.5 rounded-sm transition-all ease-in-out duration-300 cursor-pointer lg:hidden"
          >
            {open ? (
              <X className="text-red-600" size={18} />
            ) : (
              <Menu className="text-red-600" size={18} />
            )}
          </button>
        </div>
      </div>
      <div
        className="
      lg:p-6 lg:border-b border-neutral-500 p-5"
      >
        {(open || isLargeScreen) && <NavLinks setOpen={() => setOpen(false)} />}
      </div>
    </div>
  );
};

export default Navbar;
