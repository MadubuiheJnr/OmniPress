import {
  Rss,
  BookOpen,
  Sparkles,
  BarChart2,
  Archive,
  Trash2,
  Settings,
  HelpCircle,
  Bookmark,
  Search,
  Plus,
} from "lucide-react";

export const sidebarCTAs = [
  {
    label: "New article",
    path: "/articles/new",
    icon: Plus,
    variant: "primary",
  },
  {
    label: "Search",
    path: "/search",
    icon: Search,
    variant: "ghost",
  },
] as const;

// ─── Main navigation (always visible in sidebar body) ───────────────────────

export const mainNavItems = [
  {
    id: "1",
    label: "Feed",
    path: "/feed",
    icon: Rss,
    description: "Discover posts from the community",
  },
  {
    id: "2",
    label: "Articles",
    path: "/articles",
    icon: BookOpen,
    description: "Your published and draft articles",
  },
  {
    id: "3",
    label: "AI Writer",
    path: "/ai-writer",
    icon: Sparkles,
    description: "Generate and polish articles with AI",
  },
  {
    id: "4",
    label: "Analytics",
    path: "/analytics",
    icon: BarChart2,
    description: "Views, reads, and engagement stats",
  },
  {
    id: "5",
    label: "Bookmarks",
    path: "/bookmarks",
    icon: Bookmark,
    description: "Articles you've saved for later",
  },
] as const;

// ─── Footer navigation (in sidebar footer) ─────────────────────────────────
export const footerNavItems = [
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    description: "Account, profile, and preferences",
  },
  {
    label: "Support",
    path: "/support",
    icon: HelpCircle,
    description: "Help, docs, and feedback",
  },
  {
    label: "Archive",
    path: "/archive",
    icon: Archive,
    description: "Archived articles",
  },
  {
    label: "Trash",
    path: "/trash",
    icon: Trash2,
    description: "Deleted articles — recoverable for 30 days",
  },
  {
    label: "Upgrade Plan",
    path: "/pro-upgrade",
    icon: Sparkles,
    description: "Upgrade your plan to pro",
  },
] as const;
