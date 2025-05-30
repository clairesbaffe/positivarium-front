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
import PublisherRequestActions from "@/components/publisher_requests/PublisherRequestActions";

export default function PublisherRequestsList({
  currentPage,
  totalPages,
  url,
  type = "user",
  requests,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
  type?: "admin" | "user";
  requests: PublisherRequest[];
}) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Statut</TableHead>
            {type === "admin" && (
              <TableHead className="w-[100px]">Utilisateur</TableHead>
            )}
            <TableHead className="w-[500px]">Motivation</TableHead>
            <TableHead className="w-[100px]">Date de demande</TableHead>
            <TableHead className="w-[100px]">Dernière modification</TableHead>
            <TableHead className="w-[50px]"></TableHead>
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
                {type === "admin" && (
                  <TableCell className="whitespace-normal">
                    <p>{request.username}</p>
                  </TableCell>
                )}
                <TableCell className="whitespace-normal">
                  <p>{request.motivation}</p>
                </TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(request.updatedAt).toLocaleString("fr-FR")}
                </TableCell>
                <TableCell>
                  {request.status !== "APPROVED" &&
                    request.status !== "REJECTED" &&
                    request.status !== "CANCELLED" && (
                      <PublisherRequestActions id={request.id} />
                    )}
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
