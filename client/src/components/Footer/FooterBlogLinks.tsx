import { NavLink } from "react-router-dom";
import { NavData } from "../Navbar/data";

const FooterBlogLinks = () => {
  return (
    <div className="text-neutral-50 flex flex-col items-center gap-y-2">
      {NavData.slice(0, 7).map((data) => (
        <NavLink
          key={data.id}
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

export default FooterBlogLinks;
