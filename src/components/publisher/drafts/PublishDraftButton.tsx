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

export default function PublishDraftButton({ draftId }: { draftId: number }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await publishDraft(draftId);
      toast.success("Le brouillon a été publié.");
      router.push("/publisher/articles");
    } catch (error) {
      toast.error(String(error) || "Échec de l'action.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-colored-background text-foreground whitespace-nowrap cursor-pointer">
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
