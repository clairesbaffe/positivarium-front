import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const roleData = (role: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return { name: "Admin", bg: "bg-gray-400/30", color: "text-gray-800" };
    case "ROLE_PUBLISHER":
      return {
        name: "Rédacteur",
        bg: "bg-gray-400/30",
        color: "text-gray-800",
      };
    case "ROLE_USER":
      return {
        name: "Utilisateur",
        bg: "bg-gray-400/30",
        color: "text-gray-800",
      };
    case "ROLE_BAN":
      return { name: "Ban", bg: "bg-red-400/30", color: "text-red-800" };
    default:
      return { name: "", bg: "", color: "" };
  }
};