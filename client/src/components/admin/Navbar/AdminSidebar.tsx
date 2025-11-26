import { NavLink } from "react-router-dom";
import NavListData from "./NavListData";
import { useState } from "react";
import { PanelLeft, PanelLeftClose } from "lucide-react";

const AdminSidebar = () => {
  const [viewNavName, setViewNavName] = useState(false);
  return (
    <div
      className="p-3 flex flex-col items-center
    lg:p-5"
    >
      <button
        onClick={() => setViewNavName(!viewNavName)}
        className=" self-start p-3 bg-gray-400/10 rounded-full transition-all ease-in-out duration-300 cursor-pointer hidden
        lg:inline-block"
      >
        {viewNavName ? (
          <PanelLeftClose className="text-zinc-500" size={20} />
        ) : (
          <PanelLeft className="text-zinc-500" size={20} />
        )}
      </button>
      <nav
        className={`flex flex-col gap-3 p-2 rounded-full ${
          viewNavName ? "bg-transparent" : "bg-gray-100/50"
        }
        lg:mt-15`}
      >
        {NavListData.map((nav) => (
          <NavLink
            to={`${nav.slug}`}
            end
            className={({
              isActive,
            }) => `flex items-center gap-2 pl-1 py-1 rounded-full text-sm transition-all ease-in-out duration-300 last-of-type:mt-60 
            ${viewNavName ? "bg-gray-100/50 pr-3" : "bg-transparent"} 
            ${isActive ? "" : ""}
              lg:last-of-type:mt-0 `}
          >
            {({ isActive }) => (
              <>
                <span
                  className={` w-9 h-9 rounded-full flex items-center justify-center ${
                    isActive ? "bg-neutral-950" : "bg-white"
                  }`}
                >
                  <nav.icon
                    className={` w-4 ${
                      isActive ? "text-neutral-50" : "text-neutral-700"
                    }`}
                  />
                </span>
                {viewNavName && (
                  <span
                    className={`font-normal  ${
                      isActive ? "" : "text-neutral-900"
                    }`}
                  >
                    {nav.name}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
