import { getDrafts } from "@/lib/data";

import PaginationControls from "@/components/Pagination";
import DraftsList from "@/components/publisher/drafts/DraftsList";

export default async function DraftsPage({
  //   endpoint,
  //   url,
  currentPage,
}: {
  //   endpoint: string;
  //   url: string;
  currentPage: number;
}) {
  const { drafts, totalPages } = await getDrafts(currentPage);

  return (
    <div className="flex flex-col gap-4">
      {drafts.length > 0 ? (
        <>
          <DraftsList drafts={drafts} />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              url="/publisher/drafts"
              listId="drafts-list"
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Vous n'avez encore aucun brouillon
        </div>
      )}
    </div>
  );
}
