import { JournalEntry } from "@/lib/definitions";
import { deleteEntry } from "@/lib/actions";

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
import { Trash2 } from "lucide-react";

export default function DeleteEntryButton({ entry }: { entry: JournalEntry }) {
  const handleDelete = async () => {
    const res = await deleteEntry(entry.id);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de la suppression.");
      toast.error(errorData?.error || "Échec de la suppression.");
    }

    toast.success("L'entrée a été supprimée.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`bg-background-danger text-foreground-inverted flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer py-2.5 px-4 h-min rounded-md font-semibold`}
      >
        <Trash2 size={18} /> Supprimer
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette entrée sera supprimée définitivement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => handleDelete()}
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
