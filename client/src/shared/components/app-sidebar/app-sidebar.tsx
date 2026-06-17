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

const AppSidebar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { open, state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="px-0 z-50">
      <SidebarHeader>
        <AppSidebarHeader open={open} />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarCTA />
        <AppSidebarMainItem />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <AppSidebarFooter
          sidebarState={state}
          isAuthenticated={isAuthenticated}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
