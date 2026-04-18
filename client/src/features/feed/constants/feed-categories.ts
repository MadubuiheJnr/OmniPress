export interface FeedCategory {
  label: string;
  slug: string;
}

export const feedCategories: FeedCategory[] = [
  { label: "All", slug: "all" },
  { label: "World", slug: "world" },
  { label: "Science", slug: "science" },
  { label: "Arts", slug: "arts" },
  { label: "Business", slug: "business" },
  { label: "Politics", slug: "politics" },
  { label: "Sports", slug: "sports" },
  { label: "Health", slug: "health" },
];

export type FeedCategorySlug = FeedCategory["slug"];
