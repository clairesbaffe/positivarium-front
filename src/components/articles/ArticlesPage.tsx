"use client";

import { useSearchParams } from "next/navigation";
import { SimpleArticle } from "@/lib/definitions";
import PaginationControls from "@/components/Pagination";
import ArticlesList from "@/components/articles/ArticlesList";
import { useEffect, useState } from "react";

export default function ArticlesPage() {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [articles, setArticles] = useState<SimpleArticle[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/?page=${
          currentPage - 1
        }&size=12`
      );
      const data = await res.json();
      setArticles(data.content);
      setTotalPages(data.totalPages);
    };

    fetchArticles();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-4">
      <ArticlesList articles={articles} />
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          listId="articles-list"
        />
      )}
    </div>
  );
}
