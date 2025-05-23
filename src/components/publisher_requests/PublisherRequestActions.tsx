"use client";

import { updatePublisherRequestStatusAdmin } from "@/lib/actions";

import { Ellipsis } from "lucide-react";
import { toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/Button";

export default function PublisherRequestActions({ id }: { id: number }) {
  const handleClick = async (
    status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    const res = await updatePublisherRequestStatusAdmin(id, status);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de l'action.");
      toast.error(errorData?.error || "Échec de l'action.");
      return;
    }

    toast.success("La demande a été mise à jour.");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Ellipsis className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <div className="flex flex-col gap-4">
          <Button
            title="Marquer en révision"
            background="bg-colored-background"
            textColor=""
            icon={null}
            onClick={() => handleClick("UNDER_REVIEW")}
          />

          <AlertDialog>
            <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-success text-foreground whitespace-nowrap cursor-pointer">
              Accepter
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cet utilisateur deviendra rédacteur. Cette action ne peut pas
                  être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => handleClick("APPROVED")}
                >
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger text-foreground whitespace-nowrap cursor-pointer">
              Refuser
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette demande sera refusée. L'utilisateur en sera informé et
                  pourra en refaire une nouvelle.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => handleClick("REJECTED")}
                >
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
