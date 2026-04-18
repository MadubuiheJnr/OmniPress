import { feedCategories } from "../constants/feed-categories";
import { Badge } from "@/shared/components/ui/badge";

const FeedCategoryTabs = () => {
  return (
    <div className=" flex items-center gap-3 overflow-x-auto">
      {feedCategories.map(({ label, slug }) => (
        <Badge key={slug} variant={"outline"}>
          {label}
        </Badge>
      ))}
    </div>
  );
};

export default FeedCategoryTabs;
