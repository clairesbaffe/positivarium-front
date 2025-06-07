"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaginationControls from "@/components/Pagination";
import PublisherRequestActions from "@/components/publisher_requests/PublisherRequestActions";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

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
            <TableHead className="min-w-[200px]">Motivation</TableHead>
            <TableHead className="w-[100px]">Date de demande</TableHead>
            <TableHead className="w-[100px]">Dernière modification</TableHead>
            <TableHead className="w-[25px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const status: { name: string; bg: string; color: string } =
              publisherRequestStatus(request.status);

            const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                <TableCell>
                  <p className="line-clamp-6 whitespace-pre-line">{request.motivation}</p>
                </TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(request.updatedAt).toLocaleString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger
                      className={`bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold text-foreground cursor-pointer`}
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <Eye />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle className="flex gap-4 items-center">
                          Demande rédacteur{" "}
                          <p
                            className={`${status.bg} ${status.color} py-1 px-2 rounded-3xl w-min whitespace-nowrap`}
                          >
                            {status.name}
                          </p>
                        </DialogTitle>
                      </DialogHeader>

                      {request.status !== "APPROVED" &&
                        request.status !== "REJECTED" &&
                        request.status !== "CANCELLED" && (
                          <PublisherRequestActions id={request.id} />
                        )}

                      <div className="text-foreground-muted">
                        <p>
                          Envoyée le{" "}
                          {new Date(request.createdAt).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {request.createdAt !== request.updatedAt && (
                          <p>
                            Modifiée le{" "}
                            {new Date(request.updatedAt).toLocaleString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        )}
                      </div>

                      {type === "admin" && (
                        <p>
                          Envoyée par{" "}
                          <Link href={`/admin/users/${request.username}`}>
                            {request.username}
                          </Link>
                        </p>
                      )}
                      <p className="whitespace-pre-line">{request.motivation}</p>

                      <DialogFooter>
                        <Button
                          type="submit"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Fermer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
