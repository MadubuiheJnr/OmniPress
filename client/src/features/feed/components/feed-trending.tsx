import { ArticleCard } from "@/shared/components/article-card";
import { mockTrending } from "../data/mock-trending";

const FeedTrending = () => {
  const listArticles = mockTrending.slice(0, 5);
  const rankedArticles = mockTrending.slice(0, 5);

  return (
    <section className="w-full mt-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-foreground">Trending now</h2>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          See all
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Left — list cards */}
        <div className="flex flex-col gap-2">
          {listArticles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="list" />
          ))}
        </div>

        {/* Right — ranked list */}
        <div className="hidden lg:flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
            Most read
          </p>
          {rankedArticles.map((article, index) => (
            <div
              key={article._id}
              className="flex items-start gap-3 py-3 border-b border-border last:border-none group cursor-pointer"
            >
              {/* Rank number */}
              <span className="text-xs font-medium text-muted-foreground w-4 shrink-0 mt-0.5">
                {index + 1}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {article.category.name}
                </span>
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-muted-foreground transition-colors">
                  {article.title}
                </p>
                <span className="text-xs text-muted-foreground">
                  {article.views.toLocaleString()} views
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedTrending;
