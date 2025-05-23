import { PublisherRequest } from "@/lib/definitions";
import { publisherRequestStatus } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/Pagination";

export default function PublisherRequestsList({
  currentPage,
  totalPages,
  url,
  requests,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  requests: PublisherRequest[];
}) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Statut</TableHead>
            <TableHead className="w-[500px]">Motivation</TableHead>
            <TableHead className="w-[100px]">Date de demande</TableHead>
            <TableHead className="w-[100px]">Dernière modification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const status: { name: string; bg: string; color: string } =
              publisherRequestStatus(request.status);

            return (
              <TableRow key={request.id}>
                <TableCell className="font-medium whitespace-normal">
                  <p
                    className={`${status.bg} ${status.color} py-1 px-2 rounded-3xl w-min whitespace-nowrap`}
                  >
                    {status.name}
                  </p>
                </TableCell>
                <TableCell className="whitespace-normal">
                  <p>{request.motivation}</p>
                </TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(request.updatedAt).toLocaleString("fr-FR")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          url={url}
        />
      )}
    </div>
  );
}
