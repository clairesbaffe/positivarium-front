"use client";

import {
  cancelPublisherRequestUser,
  updatePublisherRequestStatusAdmin,
} from "@/lib/actions";
import { useUser } from "@/context/UserContext";

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
  const user = useUser();

  const handleAdminClick = async (
    status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    try {
      await updatePublisherRequestStatusAdmin(id, status);
      toast.success("La demande a été mise à jour.");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  const handleCancelClick = async () => {
    try {
      await cancelPublisherRequestUser(id);
      toast.success("La demande a été annulée.");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Ellipsis className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <div className="flex flex-col gap-4">
          {user?.roles.includes("ROLE_USER") && (
            <AlertDialog>
              <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger text-foreground whitespace-nowrap cursor-pointer">
                Annuler la demande
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous vraiment sûr(e) ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette demande sera annulée et ne pourra plus être acceptée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={() => handleCancelClick()}
                  >
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {user?.roles.includes("ROLE_ADMIN") &&
            !user.roles.includes("ROLE_BAN") && (
              <Button
                title="Marquer en révision"
                background="bg-colored-background"
                textColor=""
                icon={null}
                onClick={() => handleAdminClick("UNDER_REVIEW")}
              />
            )}

          {user?.roles.includes("ROLE_ADMIN") &&
            !user.roles.includes("ROLE_BAN") && (
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-success text-foreground whitespace-nowrap cursor-pointer">
                  Accepter
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous vraiment sûr(e) ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cet utilisateur deviendra rédacteur. Cette action ne peut
                      pas être annulée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={() => handleAdminClick("APPROVED")}
                    >
                      Continuer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

          {user?.roles.includes("ROLE_ADMIN") &&
            !user.roles.includes("ROLE_BAN") && (
              <AlertDialog>
                <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger text-foreground whitespace-nowrap cursor-pointer">
                  Refuser
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous vraiment sûr(e) ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette demande sera refusée. L'utilisateur en sera informé
                      et pourra en refaire une nouvelle.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={() => handleAdminClick("REJECTED")}
                    >
                      Continuer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
