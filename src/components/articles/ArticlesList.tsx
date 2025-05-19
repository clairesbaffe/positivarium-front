import ArticleCard from "./ArticleCard";
import { SimpleArticle } from "@/lib/definitions";

export default function ArticlesList({
  articles,
  size = "classic",
}: {
  articles: SimpleArticle[];
  size?: "classic" | "large";
}) {
  return (
    <ul className="grid md:grid-cols-3 gap-4" id="articles-list">
      {articles.map((article, index) =>
        size === "large" ? (
          index === 0 ? (
            <ArticleCard key={article.id} article={article} large />
          ) : (
            <ArticleCard key={article.id} article={article} />
          )
        ) : (
          <ArticleCard key={article.id} article={article} />
        )
      )}
    </ul>
  );
}
