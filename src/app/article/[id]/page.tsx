import Link from "next/link";
import type { Article, Comment } from "@/lib/definitions";
import { getArticleById, getCommentsByArticleId } from "@/lib/data";

import CommentsList from "@/components/articles/CommentsList";
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
          <CommentsList comments={comments} articleId={article.id} />
        </div>
      )}
    </div>
  );
}
