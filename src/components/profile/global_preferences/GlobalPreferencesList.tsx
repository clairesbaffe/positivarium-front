"use client";

import { redirect } from "next/navigation";
import { ArticleReport, GlobalPreference } from "@/lib/definitions";

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
import Button from "@/components/Button";
import { SquarePen, Trash2 } from "lucide-react";

export default function GlobalPreferencesTable({
  currentPage,
  totalPages,
  url,
  preferences,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  preferences: GlobalPreference[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Humeur</TableHead>
            <TableHead>Catégories d'article</TableHead>
            <TableHead className="w-[50px]">Modifier</TableHead>
            <TableHead className="w-[50px]">Supprimer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preferences.map((pref) => {
            return (
              <TableRow
                key={pref.id}
                onClick={() => redirect(`/admin/reports/articles/${pref.id}`)}
                className="cursor-pointer h-12"
              >
                <TableCell className="font-medium whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{pref.mood.name}</div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  {pref.categories.map((pref) => (
                    <p key={pref.id}>
                      {pref.name} ({pref.generalCategory})
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    title=""
                    background="bg-colored-background"
                    textColor="text-foreground-inverted"
                    icon={<SquarePen />}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    title=""
                    background="bg-background-danger"
                    textColor="text-foreground-inverted"
                    icon={<Trash2 />}
                  />
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
        />
      )}
    </div>
  );
}
