"use client";

import { useState } from "react";
import { Comment } from "@/lib/definitions";
import { createComment } from "@/lib/actions";
import { useUser } from "@/context/UserContext";

import CommentCard from "@/components/articles/CommentCard";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";

export default function CommentsList({
  comments,
  articleId,
}: {
  comments: Comment[];
  articleId: number;
}) {
  const user = useUser();

  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleComment = async (comment: string) => {
    const res = await createComment(comment, articleId);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de la publication");
      const message = errorData?.error || "Échec de la publication";
      setMessage({ message: message, type: "error" });
    }

    setIsCommenting(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <h3 className="font-title text-3xl">Commentaires</h3>
        {!isCommenting && (
          <Button
            title={"Commenter"}
            background={"bg-colored-background"}
            textColor={"text-foreground"}
            icon={null}
            onClick={() => setIsCommenting(true)}
          />
        )}
      </div>
      <div className="my-6 flex flex-col gap-8">
        {isCommenting && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-4"
          >
            <Textarea
              name="comment"
              data={comment}
              setData={setComment}
              height="large"
            />
            {message && message.type === "error" && (
              <p className="text-red-400">{message.message}</p>
            )}
            <Button
              title={"Publier"}
              background={"bg-dark-colored-background"}
              textColor={"text-foreground-inverted"}
              icon={null}
              onClick={() => handleComment(comment)}
              minWidth
            />
          </form>
        )}
        {comments.length === 0 && !isCommenting && (
          <p className="text-foreground-muted">
            Aucun commentaire pour le moment. Soyez le premier à réagir !
          </p>
        )}
        {comments && comments.length > 0 && (
          <div>
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={
                  index !== 0
                    ? "border-t border-foreground-muted/50 pt-6 mt-6"
                    : ""
                }
              >
                <CommentCard
                  comment={comment}
                  isOwn={comment.username === user?.username}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
