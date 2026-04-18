import AppHeader from "@/shared/components/app-header/app-header";
import AppSidebar from "@/shared/components/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const currentPath = useLocation();
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);

  return (
    <div>
      <TooltipProvider>
        <SidebarProvider>
          <aside>
            <AppSidebar />
          </aside>
          <SidebarInset className="min-w-0 overflow-hidden">
            <header className="px-3 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ">
              <AppHeader
                breadcrumb={currentPath.pathname}
                actions={headerActions}
              />
            </header>
            <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
              <Outlet context={{ setHeaderActions }} />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
};

export default AppLayout;
