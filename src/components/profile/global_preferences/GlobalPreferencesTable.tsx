"use client";

import { Category, GlobalPreference, Mood } from "@/lib/definitions";

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
import AddOrUpdateGlobalPreferenceButton from "@/components/profile/global_preferences/AddOrUpdateGlobalPreferenceButton";
import DeleteGlobalPreferenceButton from "@/components/profile/global_preferences/DeleteGlobalPreferenceButton";

export default function GlobalPreferencesTable({
  currentPage,
  totalPages,
  url,
  preferences,
  moods,
  categories,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  preferences: GlobalPreference[];
  moods: Mood[];
  categories: Category[];
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
              <TableRow key={pref.id} className="cursor-pointer h-12">
                <TableCell className="font-medium whitespace-normal h-[2rem]">
                  <div className="line-clamp-1">{pref.mood.name}</div>
                </TableCell>
                <TableCell className="whitespace-normal h-[2rem]">
                  {pref.categories.map((cat) => (
                    <p key={cat.id}>
                      {cat.name} ({cat.generalCategory})
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  <AddOrUpdateGlobalPreferenceButton
                    moods={moods}
                    categories={categories}
                    preference={pref}
                  />
                </TableCell>
                <TableCell>
                  <DeleteGlobalPreferenceButton preferenceId={pref.id} />
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
