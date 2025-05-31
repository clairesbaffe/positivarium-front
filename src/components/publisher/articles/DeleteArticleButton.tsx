"use client";

import { useRouter } from "next/navigation";
import { deleteArticlePublisher, deleteDraft } from "@/lib/actions";

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
import { useUser } from "@/context/UserContext";

export default function DeleteArticleButton({
  articleId,
  author,
}: {
  articleId: number;
  author: string;
}) {
  const router = useRouter();
  const user = useUser();

  if (user?.username !== author) return;

  const handleClick = async () => {
    try {
      await deleteArticlePublisher(articleId);
      toast.success("L'article a été supprimé.");
      router.push("/publisher/articles");
    } catch (error) {
      toast.error(String(error) || "Échec de l'action.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={`flex items-center justify-center gap-2 py-2.5 px-4 h-min rounded-md font-semibold  text-foreground-inverted whitespace-nowrap ${
            user.roles.includes("ROLE_BAN")
              ? "bg-background-muted cursor-not-allowed"
              : "bg-background-danger cursor-pointer"
          } `}
          disabled={user.roles.includes("ROLE_BAN")}
          title={
            user.roles.includes("ROLE_BAN")
              ? "Vous ne pouvez pas supprimer un article publié en étant banni."
              : ""
          }
        >
          <Trash2 />
          Supprimer
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous vraiment sûr(e) ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cet article sera supprimé et ne pourra pas être récupéré.
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
