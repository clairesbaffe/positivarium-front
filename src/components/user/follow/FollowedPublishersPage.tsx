import PaginationControls from "@/components/Pagination";
import { getFollowedPublishers } from "@/lib/data";
import FollowedPublishersList from "./FollowedPublishersList";

export default async function FollowedPublishersPage({
  currentPage,
}: {
  currentPage: number;
}) {
  const data = await getFollowedPublishers(currentPage);

  const publishers = data.publishers;
  const totalPages = data.totalPages;

  return (
    <div className="flex flex-col gap-4">
      {publishers.length > 0 ? (
        <>
          <FollowedPublishersList publishers={publishers} />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              url={"/user/followed"}
              listId="publishers-list"
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Aucun rédacteur suivi
        </div>
      )}
    </div>
  );
}
