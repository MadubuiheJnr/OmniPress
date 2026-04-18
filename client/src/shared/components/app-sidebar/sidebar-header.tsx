import { Link } from "react-router-dom";
import { LogoIcon, LogoWordMark } from "../logo";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export const AppSidebarHeader = ({ open }: { open: boolean }) => {
  return (
    <SidebarMenu>
      <Link to="/">
        <SidebarMenuItem className="focus:bg-transparent">
          <SidebarMenuButton
            size={open ? "lg" : "sm"}
            className="hover:bg-transparent focus:bg-transparent"
          >
            {!open && <LogoIcon />}
            <LogoWordMark classname="w-32" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Link>
    </SidebarMenu>
  );
};
