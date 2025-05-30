import { JournalEntry, Mood } from "@/lib/definitions";
import EntryCard from "./EntryCard";

export default function EntriesList({
  entries,
  moods,
}: {
  entries: JournalEntry[];
  moods: Mood[];
}) {
  return (
    <div className="flex flex-col gap-8 max-width-12">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} moods={moods} />
      ))}
    </div>
  );
}
