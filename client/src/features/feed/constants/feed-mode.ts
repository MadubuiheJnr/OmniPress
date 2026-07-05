import type { LucideIcon } from "lucide-react";
import { Clock, Flame, TrendingUp, Users, Sparkles } from "lucide-react";

export interface FeedModeOption {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface FeedModeGroup {
  groupLabel: string;
  groupValue: "discover" | "personalised";
  options: FeedModeOption[];
}

export const feedModes: FeedModeGroup[] = [
  {
    groupLabel: "Discover",
    groupValue: "discover",
    options: [
      { label: "Latest", value: "latest", icon: Clock },
      { label: "Top this week", value: "top", icon: TrendingUp },
      { label: "Trending", value: "trending", icon: Flame },
    ],
  },
  {
    groupLabel: "Personalised",
    groupValue: "personalised",
    options: [
      { label: "Following", value: "following", icon: Users },
      { label: "Recommended", value: "recommended", icon: Sparkles },
    ],
  },
];

export type FeedModeValue = FeedModeGroup["options"][number]["value"];
