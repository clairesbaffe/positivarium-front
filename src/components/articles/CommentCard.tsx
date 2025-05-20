import type { Comment } from "@/lib/definitions";
import { deleteComment } from "@/lib/actions";

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

export default function CommentCard({
  comment,
  isOwn,
}: {
  comment: Comment;
  isOwn: boolean;
}) {
  const handleDelete = async () => {
    const res = await deleteComment(comment.id);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de la publication");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-bold">{comment.username}</p>
          <div className="flex gap-4">
            {isOwn && (
              <AlertDialog>
                <AlertDialogTrigger className="text-red-400 cursor-pointer">
                  Supprimer
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Êtes-vous vraiment sûr(e) ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Cela supprimera
                      définitivement votre commentaire.
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
            )}
            <Button
              title={"Signaler"}
              background={""}
              textColor={"text-red-400"}
              icon={null}
              href={"/"}
              priority="low"
            />
          </div>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
