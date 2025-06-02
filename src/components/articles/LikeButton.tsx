"use client";

import { like, unlike } from "@/lib/actions";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";

export default function LikeButton({
  articleId,
  userLiked,
}: {
  articleId: number;
  userLiked: boolean;
}) {
  const handleClick = async () => {
    try {
      userLiked ? await unlike(articleId) : await like(articleId);
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <Heart
      onClick={handleClick}
      className={`size-8 md:size-7 text-foreground cursor-pointer ${
        userLiked ? "fill-foreground" : "fill-none"
      }`}
    />
  );
}
