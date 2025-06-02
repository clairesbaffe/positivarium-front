"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { reportArticle } from "@/lib/actions";
import { useUser } from "@/context/UserContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/Textarea";
import { toast } from "react-toastify";

export default function ReportArticleButton({
  articleId,
  author,
}: {
  articleId: number;
  author: string;
}) {
  const router = useRouter();

  const user = useUser();
  const isOwn = author === user?.username;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleReport = async () => {
    try {
      await reportArticle(reportReason, articleId);
      toast.success(
        "Votre signalement a été enregistré. Il sera traité sous peu par nos administrateurs."
      );
      setIsDialogOpen(false);
      setReportReason("");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div>
      {!isOwn && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            className={`text-red-400 cursor-pointer ${
              !user ? "disabled:cursor-not-allowed disabled:opacity-50" : ""
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
  );
}
