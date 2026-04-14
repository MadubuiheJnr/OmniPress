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
    label: "Feed",
    path: "/feed",
    icon: Rss,
    description: "Discover posts from the community",
  },
  {
    label: "Articles",
    path: "/articles",
    icon: BookOpen,
    description: "Your published and draft articles",
  },
  {
    label: "AI Writer",
    path: "/ai-writer",
    icon: Sparkles,
    description: "Generate and polish articles with AI",
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart2,
    description: "Views, reads, and engagement stats",
  },
  {
    label: "Bookmarks",
    path: "/bookmarks",
    icon: Bookmark,
    description: "Articles you've saved for later",
  },
] as const;

// ─── Footer navigation (in sidebar footer) ─────────────────────────────────
export const footerNavItems = [
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
] as const;
