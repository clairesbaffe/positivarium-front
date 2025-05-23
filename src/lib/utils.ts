import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roleData = (role: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return {
        name: "Admin",
        bg: "bg-background-muted/50",
        color: "text-foreground",
      };
    case "ROLE_PUBLISHER":
      return {
        name: "Rédacteur",
        bg: "bg-background-muted/50",
        color: "text-foreground",
      };
    case "ROLE_USER":
      return {
        name: "Utilisateur",
        bg: "bg-background-muted/50",
        color: "text-foreground",
      };
    case "ROLE_BAN":
      return { name: "Ban", bg: "bg-red-400/50", color: "text-foreground" };
    default:
      return { name: "", bg: "", color: "" };
  }
};
