"use client";

import { redirect } from "next/navigation";
import { ArticleReport } from "@/lib/definitions";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/Pagination";

export default function ArticleReportsList({
  currentPage,
  totalPages,
  url,
  reports,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  reports: ArticleReport[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Article</TableHead>
            <TableHead className="min-w-[150px]">Rédacteur</TableHead>
            <TableHead className="min-w-[300px]">Signalement</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => {
            return (
              <TableRow
                key={report.id}
                onClick={() => redirect(`/admin/reports/articles/${report.id}`)}
                className="cursor-pointer h-12"
              >
                <TableCell className="font-medium whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{report.article.title}</div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{report.article.username}</div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{report.reason}</div>
                </TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleString("fr-FR")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          url={url}
          pageParam="pageArticles"
        />
      )}
    </div>
  );
}
