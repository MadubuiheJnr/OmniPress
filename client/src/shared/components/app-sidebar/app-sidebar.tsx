import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import { AppSidebarHeader } from "./sidebar-header";
import { AppSidebarCTA } from "./sidebar-cta";
import { AppSidebarMainItem } from "./sidebar-main-items";
import AppSidebarFooter from "./sidebar-footer";
import type { AuthUser } from "@/shared/types/user.types";

interface AppSidebarProps {
  isAuthenticated: boolean;
  user: AuthUser | null;
}
const AppSidebar = ({ isAuthenticated, user }: AppSidebarProps) => {
  const { open, state, setOpen, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="px-0 z-50">
      <SidebarHeader>
        <AppSidebarHeader open={open} />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarCTA isMobile={isMobile} setOpen={setOpen} state={state} />
        <AppSidebarMainItem />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <AppSidebarFooter
          sidebarState={state}
          isAuthenticated={isAuthenticated}
          firstName={user?.firstName}
          lastName={user?.lastName}
          avatar={user?.avatar}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
