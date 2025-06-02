"use client";

import { useRouter } from "next/navigation";
import { publishDraft } from "@/lib/actions";

import { toast } from "react-toastify";
import { Send } from "lucide-react";
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
import { useUser } from "@/context/UserContext";

export default function PublishDraftButton({ draftId }: { draftId: number }) {
  const router = useRouter();
  const user = useUser();

  if (!user) return;

  const handleClick = async () => {
    try {
      await publishDraft(draftId);
      toast.success("Le brouillon a été publié.");
      router.push("/publisher/articles");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={`flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold text-foreground whitespace-nowrap ${
            user.roles.includes("ROLE_BAN")
              ? "bg-background-muted cursor-not-allowed"
              : "bg-colored-background cursor-pointer"
          } `}
          disabled={user.roles.includes("ROLE_BAN")}
          title={
            user.roles.includes("ROLE_BAN")
              ? "Vous ne pouvez pas publier un article en étant banni."
              : ""
          }
        >
          <Send />
          Publier
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
            <AlertDialogDescription>
              Ce brouillon sera publié. Il sera visible de tous et ne pourra
              plus retrouver son statut de brouillon.
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
    </div>
  );
}
