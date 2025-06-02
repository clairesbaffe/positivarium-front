"use client";

import { useState } from "react";
import { UserDetails } from "@/lib/definitions";
import { updatePassword } from "@/lib/auth";

import { toast } from 'react-toastify';
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

export default function UpdatePasswordButton({ user }: { user: UserDetails }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);


  const handleUpdate = async () => {
    try {
      if (
        previousPassword === "" ||
        newPassword === "" ||
        repeatNewPassword === ""
      ) {
        throw new Error("INPUTS_MISSING");
      } else if (newPassword !== repeatNewPassword) {
        throw new Error("PASSWORDS_NOT_MATCHING");
      }

      await updatePassword(previousPassword, newPassword);

      setMessage({ message: "", type: "success" });
      setIsDialogOpen(false);
      toast.success("Mot de passe modifié.");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez compléter tous les champs.",
            type: "error",
          });
        } else if (error.message.includes("PASSWORDS_NOT_MATCHING")) {
          setMessage({
            message: "Le nouveau mot de passe ne correspond pas.",
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
        className={`flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold bg-colored-background text-foreground`}
        onClick={() => setIsDialogOpen(true)}
      >
        Modifier mon mot de passe
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier le mot de passe</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="previousPassword">Ancien mot de passe</label>
            <Input
              type="password"
              name="previousPassword"
              data={previousPassword}
              setData={setPreviousPassword}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <Input
              type="password"
              name="newPassword"
              data={newPassword}
              setData={setNewPassword}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="repeatNewPassword">
              Répéter le nouveau mot de passe
            </label>
            <Input
              type="password"
              name="repeatNewPassword"
              data={repeatNewPassword}
              setData={setRepeatNewPassword}
            />
          </div>
        </div>
        {message && message.type === "error" && (
          <p className="text-red-400">{message.message}</p>
        )}
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleUpdate()}
          >
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
