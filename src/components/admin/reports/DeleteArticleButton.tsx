"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { deleteArticleAdmin } from "@/lib/actions";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { Trash } from "lucide-react";
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

export default function DeleteArticleAdminButton({
  articleId,
  next,
}: {
  articleId: number;
  next: string;
}) {
  const router = useRouter();
  const user = useUser();

  if (!user?.roles.includes("ROLE_ADMIN") || user?.roles.includes("ROLE_BAN"))
    return;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleClick = async () => {
    try {
      if (reason === "") {
        throw new Error("INPUTS_MISSING");
      }

      const res = await deleteArticleAdmin(articleId);

      // send notification with reason

      if (!res.success) {
        const errorData = res.error;
        console.error(errorData?.error || "Échec de l'action.");
        toast.error(errorData?.error || "Échec de l'action.");
      } else {
        router.push(next);
      }

      setMessage({ message: "", type: "success" });
    } catch (error) {
      console.error("Erreur :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez donner la raison de votre action.",
            type: "error",
          });
        } else {
          setMessage({ message: "Une erreur est survenue.", type: "error" });
        }
      } else {
        setMessage({ message: "Erreur inattendue.", type: "error" });
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={`flex gap-2 items-center bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger cursor-pointer`}
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash size={18} />
        Supprimer l'article
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Indiquez la raison de votre action</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-md">
          Pourquoi souhaitez-vous supprimer cet article ?
        </DialogDescription>
        <div className="py-4 flex flex-col gap-4">
          <Textarea
            name="reason"
            data={reason}
            setData={setReason}
            height="lg"
          />
        </div>
        {message && message.type === "error" && (
          <p className="text-red-400">{message.message}</p>
        )}
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleClick()}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
