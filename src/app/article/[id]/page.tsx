import Link from "next/link";
import type { Article, Comment } from "@/lib/definitions";
import { getArticleById, getCommentsByArticleId } from "@/lib/data";

import CommentCard from "@/components/articles/CommentCard";
import Button from "@/components/Button";
import LikeButton from "@/components/articles/LikeButton";

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const article: Article = await getArticleById(Number(id));
  const comments: Comment[] = await getCommentsByArticleId(Number(id));

  return (
    <div className="md:w-2/5 mx-4 md:mx-auto my-16">
      {article && (
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-thin">
                <Link href={"/"}>{article.category.name}</Link> ·{" "}
                {article.category.generalCategory}
              </p>
              <div className="flex flex-col gap-2">
                <h1 className="font-title text-3xl">{article.title}</h1>
                <p className="text-lg">{article.description}</p>
              </div>
              <div className="flex items-center justify-between font-thin">
                <div>
                  <Link
                    href={`/user/${article.username}`}
                    className="text-lg underline underline-offset-2"
                  >
                    {article.username}
                  </Link>
                  <div className="text-foreground-muted flex items-center gap-1">
                    <p>
                      {new Date(article.publishedAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {article.updatedAt !== article.publishedAt && (
                      <p>
                        | Modifié le :{" "}
                        {new Date(article.updatedAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <LikeButton
                  articleId={article.id}
                  userLiked={article.userLiked}
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
              minWidth
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
