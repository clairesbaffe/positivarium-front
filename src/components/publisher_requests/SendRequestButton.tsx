"use client";

import { useState } from "react";
import { sendPublisherRequest } from "@/lib/actions";
import { useUser } from "@/context/UserContext";

import { toast } from "react-toastify";
import { Send, TriangleAlert } from "lucide-react";
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
import ToLoginPageButton from "@/components/ToLoginPageButton";

export default function SendRequestButton() {
  const user = useUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [motivation, setMotivation] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  if (!user) {
    return (
      <ToLoginPageButton
        title="Se connecter pour envoyer une demande"
        next="/publisher_requests"
      />
    );
  }

  const handleClick = async () => {
    try {
      if (motivation === "") {
        throw new Error("INPUTS_MISSING");
      }

      await sendPublisherRequest(motivation);

      // send notification with motivation

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
          <DialogDescription className="flex flex-col gap-4">
            <span>
              Expliquez en quelques lignes pourquoi vous souhaitez rejoindre
              notre équipe de rédacteurs.
            </span>
            <div className="flex justify-between items-center gap-4">
              <TriangleAlert className="shrink-0" />
              <span>
                Attention, quand votre demande sera acceptée, vous perdrez
                l'accès à votre journal personnel. Si vous souhaitez en
                conserver l'accès, nous vous conseillons de créer un nouveau
                compte, afin de pouvoir publier vos propres articles.
              </span>
            </div>
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
