"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SimpleArticle } from "@/lib/definitions";
import PaginationControls from "@/components/Pagination";
import ArticlesList from "@/components/articles/ArticlesList";

// endpoint examples : "/articles/", "/articles/categories?categoryIds=15,17"
// url exemples : "/", "/article?cat=tech-science"
export default function ArticlesPage({
  endpoint,
  url,
  size = "classic",
}: {
  endpoint: string;
  url: string;
  size?: "classic" | "large";
}) {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [articles, setArticles] = useState<SimpleArticle[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${
          endpoint.includes("?") ? "&" : "?"
        }page=${currentPage - 1}&size=${
          size === "large" ? (currentPage - 1 === 0 ? 10 : 12) : 12
        }`
      );
      const data = await res.json();
      setArticles(data.content);
      setTotalPages(data.totalPages);
    };

    fetchArticles();
  }, [endpoint, currentPage]);

  return (
    <div className="flex flex-col gap-4">
      {articles.length > 0 ? (
        <>
          <ArticlesList
            articles={articles}
            size={currentPage === 1 ? size : "classic"}
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
