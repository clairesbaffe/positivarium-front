"use client";

import { Heart } from "lucide-react";
import { like, unlike } from "@/lib/actions";

export default function LikeButton({
  articleId,
  userLiked,
}: {
  articleId: number;
  userLiked: boolean;
}) {
  const handleClick = () => (userLiked ? unlike(articleId) : like(articleId));

  return (
    <Heart
      onClick={handleClick}
      className={`size-8 md:size-7 text-foreground cursor-pointer ${
        userLiked ? "fill-foreground" : "fill-none"
      }`}
    />
  );
}
