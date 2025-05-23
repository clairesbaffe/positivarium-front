"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  url: string;
  listId?: string;
  pageParam?: string;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  url,
  listId,
  pageParam = "page",
}: PaginationControlsProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("ellipsis-start");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("ellipsis-end");
    }

    pages.push(totalPages);

    return pages;
  };

  const pagesToRender = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${url}${url.includes("?") ? "&" : "?"}${pageParam}=${
                currentPage - 1
              }${listId ? `#${listId}` : ""}`}
              aria-disabled={currentPage === 1}
              onClick={(e) => currentPage === 1 && e.preventDefault()}
            />
          </PaginationItem>
        )}

        {pagesToRender.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === "number" ? (
              <PaginationLink
                href={`${url}${
                  url.includes("?") ? "&" : "?"
                }${pageParam}=${page}${listId ? `#${listId}` : ""}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`${url}${url.includes("?") ? "&" : "?"}${pageParam}=${
                currentPage + 1
              }${listId ? `#${listId}` : ""}`}
              aria-disabled={currentPage === totalPages}
              onClick={(e) => currentPage === totalPages && e.preventDefault()}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
