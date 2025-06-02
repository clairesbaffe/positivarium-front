"use client";

import { useState } from "react";
import { UserDetails } from "@/lib/definitions";
import { updateProfileInfo } from "@/lib/auth";

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

export default function UpdateInfoButton({ user }: { user: UserDetails }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description || ""); // fallback to "" because description can be null

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleUpdate = async () => {
    try {
      if (username === "" || email === "") {
        throw new Error("INPUTS_MISSING");
      }

      await updateProfileInfo(username, email, description);

      setMessage({ message: "", type: "success" });
      setIsDialogOpen(false);
      toast.success("Informations mises à jour.");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez compléter tous les champs requis.",
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
        Modifier mon profil
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier les informations de votre profil</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-md">
          <span className="text-red-400">*</span> Obligatoire
        </DialogDescription>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">
              Username <span className="text-red-400">*</span>
            </label>
            <Input name="username" data={username} setData={setUsername} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <Input type="email" name="email" data={email} setData={setEmail} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <Input
              name="description"
              data={description}
              setData={setDescription}
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
