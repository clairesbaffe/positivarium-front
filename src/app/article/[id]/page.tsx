"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Article, Comment } from "@/lib/definitions";
import Button from "@/components/Button";
import CommentCard from "@/components/articles/CommentCard";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Article() {
  const params = useParams();
  const id = params.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`
      );
      const data: Article = await res.json();
      setArticle(data);
    };

    const fetchComments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/article/${id}`
      );
      const data = await res.json();
      setComments(data.content);
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  return (
    <div className="w-2/5 flex mx-auto my-16">
      {article && (
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-thin">
                <Link href={"/"}>{article.category.name}</Link> ·{" "}
                {article.category.generalCategory}
              </p>
              <h1 className="font-title text-xl md:text-3xl">
                {article.title}
              </h1>
              {/* description */}
              <div className="flex items-center justify-between font-thin">
                <div>
                  <Link href={"/"}>{article.username}</Link>
                  <div>
                    {new Date(article.publishedAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Heart
                  className={`size-7 text-foreground cursor-pointer ${
                    article.userLiked ? "fill-foreground" : "fill-none"
                  }`}
                  onClick={() => {}}
                />
              </div>
            </div>
            <img src={article.mainImage} alt={article.title} />
            <div>{article.content}</div>
            <Button
              title={"Signaler"}
              background={""}
              textColor={"text-red-400"}
              icon={null}
              href={"/"}
              priority="low"
            />
          </section>
          <section>
            <div className="flex justify-between items-center">
              <h3 className="font-title text-3xl">Commentaires</h3>
              <Button
                title={"Commenter"}
                background={"bg-colored-background"}
                textColor={"text-foreground"}
                icon={null}
                href={"/"}
              />
            </div>
            <div className="my-6">
              {comments.length === 0 && (
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
                      <CommentCard comment={comment} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
