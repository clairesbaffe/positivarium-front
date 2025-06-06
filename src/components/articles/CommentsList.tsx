"use client";

import { useState } from "react";
import { Comment } from "@/lib/definitions";
import { createComment } from "@/lib/actions";
import { useUser } from "@/context/UserContext";

import { toast } from "react-toastify";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import CommentCard from "@/components/articles/CommentCard";
import ToLoginPageButton from "@/components/ToLoginPageButton";

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

  const handleComment = async (comment: string) => {
    try {
      await createComment(comment, articleId);
      setIsCommenting(false);
      setComment("");
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <section id="comments-list">
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
        <h3 className="font-title text-3xl">Commentaires</h3>
        {user ? (
          <div>
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
        ) : (
          <ToLoginPageButton
            title="Se connecter pour commenter"
            next={`/article/${articleId}`}
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
              height="lg"
            />
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
                  articleId={articleId}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
