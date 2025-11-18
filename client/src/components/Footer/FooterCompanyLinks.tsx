import { NavLink } from "react-router-dom";
import { NavData } from "../Navbar/data";

const FooterCompanyLinks = () => {
  return (
    <div className="text-neutral-50 flex flex-col items-center gap-y-2">
      <NavLink
        to="/"
        className={({
          isActive,
        }) => `text-base font-semibold hover:text-red-800 transition-all duration-300 ease-in-out
        ${isActive && "text-red-800"}`}
      >
        Home
      </NavLink>
      {NavData.slice(7, 9).map((data) => (
        <NavLink
          to={data.slug}
          className={({
            isActive,
          }) => `text-sm font-semibold hover:text-red-800 transition-all duration-300 ease-in-out
        ${isActive && "text-red-800"}`}
        >
          {data.name}
        </NavLink>
      ))}
    </div>
  );
};

export default FooterCompanyLinks;
