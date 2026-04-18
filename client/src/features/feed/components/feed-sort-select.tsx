// features/feed/components/FeedSortSelect.tsx

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function FeedSortSelect() {
  return (
    <Select defaultValue="latest">
      <SelectTrigger className="w-40 shadow-none border border-border">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="start" className="shadow-none!">
        <SelectGroup>
          <SelectLabel>Discover</SelectLabel>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="top">Top this week</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Personalized</SelectLabel>
          <SelectItem value="following">Following</SelectItem>
          <SelectItem value="recommended">Recommended</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
