import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/definitions";

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return(
    <ul className="grid md:grid-cols-3 gap-4" id="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ul>
  )
}
