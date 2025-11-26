import { NavLink } from "react-router-dom";
import { NavData } from "./data";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

const NavLinks = ({ setOpen }: { setOpen: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="w-full flex flex-col  gap-y-2 
    lg:flex-row justify-center lg:gap-x-5  lg:font-semibold"
      >
        {NavData.map((item) => (
          <NavLink
            to={item.slug}
            key={item.id}
            onClick={setOpen}
            className={({ isActive }) =>
              `text-base text-neutral-800 hover:text-red-800 transition-all duration-300 ease-in-out
          ${isActive && "text-red-800"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default NavLinks;
