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
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
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

          {isAuthenticated ? (
            <UserProfileIcon />
          ) : (
            // user.role === "admin" ? (
            //   "Dashboard"
            // ) : (
            //   <ProfileIcon />
            // )
            <LoginButton />
          )}

          <motion.button
            whileTap={{ y: 5 }}
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center border border-red-600 p-1.5 rounded-sm transition-all ease-in-out duration-300 cursor-pointer lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: 0, opacity: 0, y: -6 }}
                  animate={{ rotate: 360, opacity: 1, y: 0 }}
                  exit={{ rotate: 0, opacity: 0, y: 6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{ display: "inline-block" }}
                >
                  <X className="text-red-600" size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 0, opacity: 0, y: -6 }}
                  animate={{ rotate: 360, opacity: 1, y: 0 }}
                  exit={{ rotate: 0, opacity: 0, y: 6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{ display: "inline-block" }}
                >
                  <Menu className="text-red-600" size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
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
