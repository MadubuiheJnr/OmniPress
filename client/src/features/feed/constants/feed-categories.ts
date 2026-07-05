import {
  Globe,
  FlaskConical,
  Palette,
  Briefcase,
  Landmark,
  Trophy,
  HeartPulse,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export interface FeedCategory {
  label: string;
  slug: string;
  icon: LucideIcon;
}

export const feedCategories: FeedCategory[] = [
  { label: "All", slug: "all", icon: LayoutGrid },
  { label: "World", slug: "world", icon: Globe },
  { label: "Science", slug: "science", icon: FlaskConical },
  { label: "Arts", slug: "arts", icon: Palette },
  { label: "Business", slug: "business", icon: Briefcase },
  { label: "Politics", slug: "politics", icon: Landmark },
  { label: "Sports", slug: "sports", icon: Trophy },
  { label: "Health", slug: "health", icon: HeartPulse },
];

export type FeedCategorySlug = FeedCategory["slug"];
