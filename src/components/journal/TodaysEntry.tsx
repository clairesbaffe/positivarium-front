"use client";

import { Category, JournalEntry, Mood } from "@/lib/definitions";

import EntryCard from "@/components/journal/EntryCard";

export default function TodaysEntry({
  todaysEntry,
  moods,
  categories,
}: {
  todaysEntry: JournalEntry;
  moods: Mood[];
  categories: Category[];
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-12 md:gap-6">
        <h2 className="font-title text-2xl md:text-3xl">
          Journal d'aujourd'hui{" "}
          {new Date(todaysEntry.createdAt).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h2>
        <EntryCard
          entry={todaysEntry}
          moods={moods}
          categories={categories}
          displayTitle={false}
        />
      </div>
    </div>
  );
}
