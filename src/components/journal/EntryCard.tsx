"use client";

import { JournalEntry, Mood } from "@/lib/definitions";
import { moodColor } from "@/lib/utils";

import UpdateEntryButton from "@/components/journal/UpdateEntryButton";
import DeleteEntryButton from "@/components/journal/DeleteEntryButton";

export default function EntryCard({
  entry,
  moods,
}: {
  entry: JournalEntry;
  moods: Mood[];
}) {
  return (
    <div className="border border-foreground-muted rounded-2xl p-4 flex flex-col gap-12 md:gap-6">
      <div className="flex flex-col md:flex-row gap-6 md:justify-between">
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl font-semibold">
            {new Date(entry.createdAt).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>
        <div className="flex gap-4">
          <UpdateEntryButton entry={entry} moods={moods} />
          <DeleteEntryButton entry={entry} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {entry.moods.map((mood) => {
            const { bg, text } = moodColor(mood.type);
            return (
              <p
                key={mood.id}
                className={`${bg} ${text} text-sm px-3 py-1 rounded-xl`}
              >
                {mood.name}
              </p>
            );
          })}
        </div>
        <p className="whitespace-pre-line">{entry.description}</p>
      </div>
    </div>
  );
}
