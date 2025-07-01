"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/lib/actions";

import { toast } from "react-toastify";
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
import Input from "@/components/Input";

export default function DeleteAccountButton() {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleUpdate = async () => {
    try {
      if (password === "") {
        throw new Error("INPUTS_MISSING");
      }
      await deleteAccount(password);
      setMessage({ message: "", type: "success" });
      setIsDialogOpen(false);
      toast.success("Votre compte a été supprimé.");
      router.push("/");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez compléter tous les champs requis.",
            type: "error",
          });
        } else if (error.message.includes("401")) {
          setMessage({
            message: "Le mot de passe ne correspond pas.",
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
        className={`flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold bg-background-danger text-foreground`}
        onClick={() => setIsDialogOpen(true)}
      >
        Supprimer mon compte
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Supprimer mon compte</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-md">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </DialogDescription>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Entrez votre mot de passe pour confirmer
            </label>
            <Input
              name="password"
              type="password"
              data={password}
              setData={setPassword}
            />
          </div>
        </div>
        {message && message.type === "error" && (
          <p className="text-red-400">{message.message}</p>
        )}
        <DialogFooter className="flex flex-col md:flex-row">
          <Button
            type="submit"
            variant="default"
            className="cursor-pointer"
            onClick={() => handleUpdate()}
          >
            Supprimer définitivement
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
