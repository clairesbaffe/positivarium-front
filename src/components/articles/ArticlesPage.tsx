import PaginationControls from "@/components/Pagination";
import ArticlesList from "@/components/articles/ArticlesList";
import { getArticles } from "@/lib/data";

// endpoint examples : "/articles/", "/articles/categories?categoryIds=15,17"
// url exemples : "/", "/article?cat=tech-science"
export default async function ArticlesPage({
  endpoint,
  url,
  size = "classic",
  currentPage,
}: {
  endpoint: string;
  url: string;
  size?: "classic" | "large";
  currentPage: number;
}) {
  const data = await getArticles(
    `${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${
      currentPage - 1
    }&size=${size === "large" ? (currentPage - 1 === 0 ? 10 : 12) : 12}`
  );

  const articles = data.articles;
  const totalPages = data.totalPages;

  return (
    <div className="flex flex-col gap-4">
      {articles.length > 0 ? (
        <>
          <ArticlesList
            articles={articles}
            size={currentPage === 1 ? size : "classic"}
            back={url}
          />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              url={url}
              listId="articles-list"
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Aucun article n'est disponible
        </div>
      )}
    </div>
  );
}
