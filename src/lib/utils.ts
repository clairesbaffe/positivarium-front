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

export const publisherRequestStatus = (
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "CANCELLED"
) => {
  switch (status) {
    case "PENDING":
      return {
        name: "En attente",
        bg: "bg-amber-500/10 dark:bg-amber-500/20",
        color: "text-amber-600 dark:text-amber-300",
      };
    case "UNDER_REVIEW":
      return {
        name: "En révision",
        bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
        color: "text-indigo-600 dark:text-indigo-300",
      };
    case "APPROVED":
      return {
        name: "Approuvée",
        bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
        color: "text-emerald-600 dark:text-emerald-300",
      };
    case "REJECTED":
      return {
        name: "Refusée",
        bg: "bg-rose-500/10 dark:bg-rose-500/20",
        color: "text-rose-600 dark:text-rose-300",
      };
    case "CANCELLED":
      return {
        name: "Annulée",
        bg: "bg-neutral-500/10 dark:bg-neutral-500/20",
        color: "text-neutral-600 dark:text-neutral-300",
      };
  }
};

export const moodColor = (
  type:
    | "Joie"
    | "Tristesse"
    | "Colère"
    | "Peur"
    | "Surprise"
    | "Dégoût"
    | "Confiance"
    | "Anticipation"
): { bg: string; text: string } => {
  switch (type) {
    case "Joie":
      return { bg: "bg-mood-joy", text: "text-foreground-light-bg" };
    case "Tristesse":
      return { bg: "bg-mood-sadness", text: "text-foreground-inverted" };
    case "Colère":
      return { bg: "bg-mood-anger", text: "text-foreground-inverted" };
    case "Peur":
      return { bg: "bg-mood-fear", text: "text-foreground-inverted" };
    case "Surprise":
      return { bg: "bg-mood-surprise", text: "text-foreground-inverted" };
    case "Dégoût":
      return { bg: "bg-mood-disgust", text: "text-foreground-inverted" };
    case "Confiance":
      return { bg: "bg-mood-trust", text: "text-foreground-inverted" };
    case "Anticipation":
      return { bg: "bg-mood-anticipation", text: "text-foreground-inverted" };
    default:
      return { bg: "bg-background-muted", text: "text-foreground" };
  }
};
