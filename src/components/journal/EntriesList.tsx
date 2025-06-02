import { Category, JournalEntry, Mood } from "@/lib/definitions";
import EntryCard from "./EntryCard";

export default function EntriesList({
  entries,
  moods,
  categories,
}: {
  entries: JournalEntry[];
  moods: Mood[];
  categories: Category[];
}) {
  return (
    <div className="flex flex-col gap-8 max-width-12">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          moods={moods}
          categories={categories}
        />
      ))}
    </div>
  );
}
