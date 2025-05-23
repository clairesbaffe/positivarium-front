"use client";

import { useUser } from "@/context/UserContext";
import { UserDetails } from "@/lib/definitions";
import { grantAdmin } from "@/lib/actions";

import { toast } from "react-toastify";
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

export default function GrantAdminButton({ user }: { user: UserDetails }) {
  const connectedUser = useUser();

  const handleClick = async () => {
    const res = await grantAdmin(user.username);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de l'action.");
      toast.error(errorData?.error || "Échec de l'action.");
    }

    toast.success("L'utilisateur est maintenant administrateur.");
  };

  return (
    <div>
      {!connectedUser?.roles.includes("ROLE_BAN") &&
        connectedUser?.roles.includes("ROLE_ADMIN") &&
        !user.roles.includes("ROLE_BAN") &&
        !user.roles.includes("ROLE_ADMIN") && (
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-colored-background text-foreground whitespace-nowrap cursor-pointer">
              Rendre administrateur
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cet utilisateur obtiendra les droits d'administration. Vous ne
                  pourrez pas annuler votre action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => handleClick()}
                >
                  Continuer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </div>
  );
}
