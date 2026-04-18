import { ArticleCard } from "@/shared/components/article-card";
import { mockArticles } from "../data/mock-articles";

const FeedHero = () => {
  return (
    <div className="w-full max-w-full mt-3 overflow-x-auto scrollbar-none">
      <div className="flex lg:grid lg:grid-cols-4 gap-2 w-max lg:w-full">
        {mockArticles.slice(0, 4).map((item) => (
          <ArticleCard
            key={item._id}
            article={item}
            variant="hero"
            className="w-80 lg:w-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default FeedHero;
