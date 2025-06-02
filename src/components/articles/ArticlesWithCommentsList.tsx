import ArticleWithCommentsCard from "./ArticleWithCommentsCard";
import { CommentWithArticle, SimpleArticle } from "@/lib/definitions";

export default function ArticlesList({
  articles,
}: {
  articles: CommentWithArticle[];
}) {
  return (
    <ul className="grid md:grid-cols-1 gap-4" id="articles-list">
      {articles.map((article) => (
        <ArticleWithCommentsCard key={article.id} comment={article} />
      ))}
    </ul>
  );
}
