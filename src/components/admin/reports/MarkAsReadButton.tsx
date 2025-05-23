"use client";

import Button from "@/components/Button";
import { markReportAsRead } from "@/lib/actions";
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

export default function MarkAsReadButton({
  reportId,
  reportType,
}: {
  reportId: number;
  reportType: "article" | "comment";
}) {
  const handleClick = async () => {
    const res = await markReportAsRead(reportId, reportType);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de l'action.");
      toast.error(errorData?.error || "Échec de l'action.");
    }

    toast.success("Ce signalement a été marqué comme lu.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold bg-colored-background text-foreground whitespace-nowrap cursor-pointer">
        Marquer le signalement comme traité
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr d'avoir fait les actions nécessaires pour traiter ce signalement ?
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
  );
}
