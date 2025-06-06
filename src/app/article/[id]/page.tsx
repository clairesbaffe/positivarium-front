import Link from "next/link";
import type { Article } from "@/lib/definitions";
import { getArticleById } from "@/lib/data";

import SanitizedContent from "@/components/SanitizedContent";
import CommentsPage from "@/components/articles/CommentsPage";
import LikeButton from "@/components/articles/LikeButton";
import ReportArticleButton from "@/components/articles/ReportArticleButton";
import DeleteArticleAdminButton from "@/components/admin/reports/DeleteArticleButton";
import UpdateArticleButton from "@/components/publisher/articles/UpdateArticleButton";
import DeleteArticleButton from "@/components/publisher/articles/DeleteArticleButton";

export default async function Article({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const id = (await params).id;
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  const article: Article = await getArticleById(Number(id));

  return (
    <div className="md:w-1/2 mx-4 md:mx-auto my-16 flex flex-col gap-8">
      {article ? (
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-thin">
                <Link href={"/"}>{article.category.name}</Link> ·{" "}
                {article.category.generalCategory}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <h1 className="font-title text-4xl">{article.title}</h1>
                  <div className="flex gap-4">
                    <UpdateArticleButton
                      articleId={article.id}
                      author={article.username}
                    />
                    <DeleteArticleAdminButton
                      articleId={article.id}
                      author={article.username}
                      next="/"
                    />
                    <DeleteArticleButton
                      articleId={article.id}
                      author={article.username}
                    />
                  </div>
                </div>
                <p className="text-lg">{article.description}</p>
              </div>
              <div className="flex items-center justify-between font-thin">
                <div>
                  <Link
                    href={`/profile/${article.username}`}
                    className="text-lg underline underline-offset-2"
                  >
                    {article.username}
                  </Link>
                  <div className="text-foreground-muted flex flex-col md:flex-row md:items-center gap-1">
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
                      <div className="flex items-center gap-1">
                        <p className="hidden md:flex"> | </p>
                        <p>
                          Modifié le :{" "}
                          {new Date(article.updatedAt).toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
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
            <SanitizedContent content={article.content} />
            <ReportArticleButton
              articleId={article.id}
              author={article.username}
            />
          </section>
          <CommentsPage
            articleId={article.id}
            currentPage={currentPage}
            url={`/article/${article.id}`}
          />
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Cet article n'a pas été trouvé
        </div>
      )}
    </div>
  );
}
