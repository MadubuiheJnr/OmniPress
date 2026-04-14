import AppSidebar from "@/shared/components/app-sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <TooltipProvider>
        <SidebarProvider>
          <div>
            <SidebarTrigger />
            <AppSidebar />
            <Outlet />
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
};

export default AppLayout;
