"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { UserDetails } from "@/lib/definitions";
import { ban, unban } from "@/lib/actions";

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
import { Lock, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/Textarea";

export default function BanButton({ user }: { user: UserDetails }) {
  const connectedUser = useUser();

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

      user.roles.includes("ROLE_BAN")
        ? await unban(user.username)
        : await ban(user.username);

      // send notification with reason

      toast.success(
        user.roles.includes("ROLE_BAN")
          ? "L'utilisateur n'est plus banni"
          : "L'utilisateur est maintenant banni"
      );
      setMessage({ message: "", type: "success" });
      setReason("");
      setIsDialogOpen(false);
    } catch (error) {
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
    <div>
      {!connectedUser?.roles.includes("ROLE_BAN") &&
        connectedUser?.roles.includes("ROLE_ADMIN") &&
        !user.roles.includes("ROLE_ADMIN") && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              className={`bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold ${
                user.roles.includes("ROLE_BAN")
                  ? "bg-colored-background"
                  : "bg-background-danger"
              } text-foreground cursor-pointer`}
              onClick={() => setIsDialogOpen(true)}
            >
              {user.roles.includes("ROLE_BAN") ? (
                <div className="flex items-center justify-center whitespace-nowrap gap-2">
                  <LockOpen size={18} />
                  Unban
                </div>
              ) : (
                <div className="flex items-center justify-center whitespace-nowrap gap-2">
                  <Lock size={18} />
                  Bannir
                </div>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Indiquez la raison de votre action</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-md">
                {user.roles.includes("ROLE_BAN")
                  ? "Pourquoi voulez-vous unban cet utilisateur ?"
                  : "Pourquoi voulez-vous bannir cet utilisateur ?"}
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
                  {user.roles.includes("ROLE_BAN") ? "Unban" : "Bannir"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
}
