import { ChevronsUpDown } from "lucide-react";
import { LogoWordMark } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import { footerNavItems, mainNavItems, sidebarCTAs } from "./data";
import { LogoutButton } from "./logout-btn";

const AppSidebar = () => {
  return (
    <Sidebar className="px-0">
      <SidebarHeader>
        <LogoWordMark classname="w-1/2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarCTAs.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>PLATFORM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  <span className="sr-only">{item.description}</span>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:border-none!">
            <Item className="px-1 py-0 w-full">
              <ItemMedia>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronsUpDown
                  size={14}
                  className="text-muted-foreground shrink-0"
                />
              </ItemActions>
            </Item>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 md:w-56 shadow-xs shadow-border border-border mb-3">
            <DropdownMenuGroup>
              {footerNavItems.map((item) => (
                <DropdownMenuItem key={item.path}>
                  <item.icon className="me-2" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Logout Option */}
            <DropdownMenuItem className="py-2">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
