"use client";

import { useState } from "react";
import { sendPublisherRequest } from "@/lib/actions";

import { toast } from "react-toastify";
import { Send } from "lucide-react";
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

export default function SendRequestButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [motivation, setMotivation] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleClick = async () => {
    try {
      if (motivation === "") {
        throw new Error("INPUTS_MISSING");
      }

      const res = await sendPublisherRequest(motivation);

      // send notification with motivation

      if (!res.success) {
        const errorData = res.error;
        console.error(errorData?.error || "Échec de l'action.");
        toast.error(errorData?.error || "Échec de l'action.");
      }

      toast.success("Demande envoyée avec succès");
      setMessage({ message: "", type: "success" });
      setMotivation("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez donner votre motivation à devenir rédacteur.",
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
        className={`bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold bg-colored-background text-foreground cursor-pointer`}
      >
        <div className="flex items-center gap-2 justify-center">
          <Send size={18} />
          Faire une demande
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            Demande pour devenir rédacteur du Positivarium
          </DialogTitle>
          <DialogDescription>
            Expliquez en quelques lignes pourquoi vous souhaitez rejoindre notre
            équipe de rédacteurs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            name="motivation"
            data={motivation}
            setData={setMotivation}
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
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
