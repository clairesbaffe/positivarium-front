import { PublisherRequest } from "@/lib/definitions";
import { getUserPublisherResquests } from "@/lib/data";

import PublisherRequestsList from "@/components/publisher_requests/PublisherRequestsList";
import SendRequestButton from "@/components/publisher_requests/SendRequestButton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  const res = await getUserPublisherResquests(currentPage);
  const requests: PublisherRequest[] = res.requests;
  const totalPages = res.totalPages;

  return (
    <div className="flex flex-col my-16 md:w-2/3 md:mx-auto gap-8 mx-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="font-title text-2xl md:text-4xl">Devenir rédacteur</h1>
        <SendRequestButton />
      </div>
      <p>
        Retrouvez ici vos demandes envoyées pour devenir rédacteur sur le
        Positivarium. Nos administrateurs reviendront vers vous dès que
        possible.
      </p>
      <PublisherRequestsList
        currentPage={currentPage}
        totalPages={totalPages}
        url="/publisher_requests"
        requests={requests}
      />
    </div>
  );
}
