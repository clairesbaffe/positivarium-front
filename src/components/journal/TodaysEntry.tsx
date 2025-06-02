"use client";

import { Category, JournalEntry, Mood } from "@/lib/definitions";
import { moodColor } from "@/lib/utils";

import UpdateEntryButton from "./UpdateEntryButton";
import DeleteEntryButton from "./DeleteEntryButton";

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
        <div className="flex flex-col md:flex-row gap-6 md:justify-between">
          <h2 className="font-title text-2xl md:text-3xl">
            Journal d'aujourd'hui{" "}
            {new Date(todaysEntry.createdAt).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex gap-4">
            <UpdateEntryButton entry={todaysEntry} moods={moods} />
            <DeleteEntryButton entry={todaysEntry} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {todaysEntry.moods.map((mood) => {
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
          {/* whitespace-pre-line to display \n */}
          <p className="whitespace-pre-line">{todaysEntry.description}</p>
        </div>
      </div>
    </div>
  );
}
