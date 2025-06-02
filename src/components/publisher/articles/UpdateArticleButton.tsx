"use client";

import Button from "@/components/Button";
import { useUser } from "@/context/UserContext";
import { SquarePen } from "lucide-react";

export default function UpdateArticleButton({
  articleId,
  author,
}: {
  articleId: number;
  author: string;
}) {
  const user = useUser();

  if (user?.username !== author) return;

  return (
    <Button
      title="Modifier"
      background="bg-colored-background"
      textColor="text-foreground"
      icon={<SquarePen size={18} />}
      href={`/publisher/articles/update/${articleId}`}
      disabled={user.roles.includes("ROLE_BAN")}
      disabledReason={
        user.roles.includes("ROLE_BAN")
          ? "Vous ne pouvez pas modifier un article publié en étant banni."
          : ""
      }
    />
  );
}
