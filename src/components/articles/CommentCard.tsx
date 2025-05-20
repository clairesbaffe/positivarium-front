import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Comment } from "@/lib/definitions";
import { deleteComment, reportComment } from "@/lib/actions";
import { useUser } from "@/context/UserContext";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Textarea from "@/components/Textarea";
import { Button } from "@/components/ui/button";

export default function CommentCard({
  comment,
  isOwn,
  articleId,
}: {
  comment: Comment;
  isOwn: boolean;
  articleId: number;
}) {
  const router = useRouter();
  const user = useUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleDelete = async () => {
    const res = await deleteComment(articleId, comment.id);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de la publication");
    }
  };

  const handleReport = async () => {
    const res = await reportComment(reportReason, comment.id);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec du signalement");
    }

    setIsDialogOpen(false);
    router.push(`/article/${articleId}?success=1`);
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
            {!isOwn && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger
                  className={`text-red-400 cursor-pointer ${
                    !user
                      ? "disabled:cursor-not-allowed disabled:opacity-50"
                      : ""
                  }`}
                  disabled={!user}
                  title={!user ? "Vous devez être connecté pour signaler." : ""}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Signaler
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Signaler</DialogTitle>
                    <DialogDescription className="text-md">
                      Donnez la raison de votre signalement
                    </DialogDescription>
                  </DialogHeader>
                  <div className="gap-4 py-4">
                    <Textarea
                      name="reportReason"
                      data={reportReason}
                      setData={setReportReason}
                      height="lg"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleReport()}
                    >
                      Signaler
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
