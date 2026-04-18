import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { mainNavItems } from "./constants";

export const AppSidebarMainItem = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>PLATFORM</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <NavLink to={item.path} key={item.id}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
                {item.path === "/ai-writer" && (
                  <SidebarMenuBadge className="bg-accent/10">
                    AI
                  </SidebarMenuBadge>
                )}
                <span className="sr-only">{item.description}</span>
              </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
