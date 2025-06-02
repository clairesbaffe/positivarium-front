"use client";

import { useRouter } from "next/navigation";
import { deleteDraft } from "@/lib/actions";

import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
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

export default function DeleteDraftButton({ draftId }: { draftId: number }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await deleteDraft(draftId);
      toast.success("Le brouillon a été supprimé.");
      router.push("/publisher/drafts");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger text-foreground-inverted whitespace-nowrap cursor-pointer">
          <Trash2 />
          Supprimer
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
            <AlertDialogDescription>
              Ce brouillon sera supprimé et ne pourra pas être récupéré.
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
