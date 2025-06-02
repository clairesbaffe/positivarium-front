import { deleteGlobalPreference } from "@/lib/actions";

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

export default function DeleteGlobalPreferenceButton({
  preferenceId,
}: {
  preferenceId: number;
}) {
  const handleDelete = async () => {
    try {
      await deleteGlobalPreference(preferenceId);
      toast.success("La préférence a été supprimée.");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`bg-background-danger text-foreground-inverted flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer py-2.5 px-4 h-min rounded-md font-semibold`}
      >
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette préférence sera supprimée définitivement.
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
