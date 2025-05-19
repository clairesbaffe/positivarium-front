"use client";

import { useSearchParams } from "next/navigation";
import { SimpleArticle } from "@/lib/definitions";
import PaginationControls from "@/components/Pagination";
import ArticlesList from "@/components/articles/ArticlesList";
import { useEffect, useState } from "react";

// endpoint examples : "/articles/", "/articles/categories?categoryIds=15,17"
// url exemples : "/", "/article?cat=tech-science"
export default function ArticlesPage({
  endpoint,
  url,
}: {
  endpoint: string;
  url: string;
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
        }page=${currentPage - 1}&size=12`
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
          <ArticlesList articles={articles} />
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
