import { JournalEntry } from "@/lib/definitions";
import { getCategories, getEntries, getMoods } from "@/lib/data";

import PaginationControls from "@/components/Pagination";
import EntriesList from "@/components/journal/EntriesList";

export default async function EntriesPage({
  currentPage,
}: {
  currentPage: number;
}) {
  const data = await getEntries(currentPage);
  const entries: JournalEntry[] = data.entries;
  const totalPages = data.totalPages;

  const moods = await getMoods();
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      {entries.length > 0 ? (
        <>
          <EntriesList
            entries={entries}
            moods={moods}
            categories={categories}
          />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              url="/journal?tab=past"
              listId="entries-list"
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Aucun entrée
        </div>
      )}
    </div>
  );
}
