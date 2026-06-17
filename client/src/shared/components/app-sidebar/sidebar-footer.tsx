import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronsUpDown, LogInIcon } from "lucide-react";
import { footerNavItems } from "./constants";
import { LogoutButton } from "./logout-btn";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AppSidebarFooter = ({
  sidebarState,
  isAuthenticated,
}: {
  sidebarState: "expanded" | "collapsed";
  isAuthenticated: boolean;
}) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:border-none!">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage />
                  <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">John Doe</span>
                  <span className="truncate text-xs">Free Plan</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(
                "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg shadow-xs",
                sidebarState === "collapsed" && "ml-2",
              )}
              side="bottom"
              align="end"
              sideOffset={15}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-xs">
                      John Doe
                    </span>
                    <span className="truncate text-xs">
                      johndoe@example.com
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {footerNavItems.map((item) => (
                  <DropdownMenuItem
                    key={item.path}
                    className="text-xs font-medium"
                  >
                    <item.icon className="me-2" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {/* Logout Option */}
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenuButton
            asChild
            size="lg"
            tooltip="Login to access your account and personalized features"
            className={cn(
              sidebarState === "expanded" &&
                "h-40 hover:bg-transparent focus:bg-transparent",
              "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
            )}
          >
            {sidebarState === "collapsed" ? (
              <Button variant="ghost" size="lg">
                <Link to="auth/login">
                  <LogInIcon className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col space-y-5">
                <p className="grid text-sm gap-2">
                  <span className="font-semibold">
                    Get started with OmniPress
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Login to create and manage your articles with AI, customize
                    your feed, and connect with other writers.
                  </span>
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link to="auth/login">Login</Link>
                </Button>
              </div>
            )}
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppSidebarFooter;
