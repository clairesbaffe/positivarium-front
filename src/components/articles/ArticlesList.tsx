import ArticleCard from "./ArticleCard";
import { SimpleArticle } from "@/lib/definitions";

export default function ArticlesList({
  articles,
  size = "classic",
  back,
}: {
  articles: SimpleArticle[];
  size?: "classic" | "large";
  back: string;
}) {
  return (
    <ul className="grid md:grid-cols-3 gap-4" id="articles-list">
      {articles.map((article, index) =>
        size === "large" ? (
          index === 0 ? (
            <ArticleCard key={article.id} article={article} back={back} large />
          ) : (
            <ArticleCard key={article.id} article={article} back={back} />
          )
        ) : (
          <ArticleCard key={article.id} article={article} back={back} />
        )
      )}
    </ul>
  );
}
