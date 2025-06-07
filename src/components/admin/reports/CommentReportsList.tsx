"use client";

import { redirect } from "next/navigation";
import { CommentReport } from "@/lib/definitions";

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

export default function CommentReportsList({
  currentPage,
  totalPages,
  url,
  reports,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  reports: CommentReport[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px]">Commentaire</TableHead>
            <TableHead className="min-w-[150px]">Rédacteur du commentaire</TableHead>
            <TableHead className="min-w-[200px]">Article</TableHead>
            <TableHead className="min-w-[300px]">Signalement</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => {
            return (
              <TableRow
                key={report.id}
                onClick={() => redirect(`/admin/reports/comments/${report.id}`)}
                className="cursor-pointer h-12"
              >
                <TableCell className="font-medium whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{report.comment.content}</div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">
                    {report.comment.username}
                  </div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">
                    {report.comment.article.title}
                  </div>
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
          pageParam="pageComments"
        />
      )}
    </div>
  );
}
