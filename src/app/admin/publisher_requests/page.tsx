import { PublisherRequest } from "@/lib/definitions";
import { getActivePublisherResquests } from "@/lib/data";
import PublisherRequestsList from "@/components/publisher_requests/PublisherRequestsList";

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  const res = await getActivePublisherResquests(currentPage);
  const requests: PublisherRequest[] = res.requests;
  const totalPages = res.totalPages;

  return (
    <div className="flex flex-col my-16 md:w-2/3 md:mx-auto gap-8 mx-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="font-title text-2xl md:text-4xl">Demandes rédacteur</h1>
      </div>
      <PublisherRequestsList
        currentPage={currentPage}
        totalPages={totalPages}
        url="/admin/publisher_requests"
        type="admin"
        requests={requests}
      />
    </div>
  );
}
