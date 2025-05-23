import { getCommentReportById } from "@/lib/data";
import { CommentReport } from "@/lib/definitions";
import Link from "next/link";
import Button from "@/components/Button";

export default async function CommentReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const report: CommentReport = await getCommentReportById(Number(id));

  return (
    <div className="md:w-3/5 mx-4 md:mx-auto my-16 flex flex-col gap-8">
      <h1 className="font-title text-3xl">Signalement d'un commentaire</h1>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-8">
        <section className="md:w-1/3 border border-foreground-muted rounded-lg">
          {/* Could href to comment directly */}
          <Link
            href={`/article/${report.comment.article.id}`}
            className="flex flex-col"
          >
            <img
              src={report.comment.article.mainImage}
              alt={report.comment.article.title}
            />
            <div className="flex flex-col gap-4 p-4">
              <h3 className="text-lg font-bold">
                {report.comment.article.title}
              </h3>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Commentaire :</p>
                <p>
                  {report.comment.username}
                </p>
                <p>{report.comment.content}</p>
              </div>
            </div>
          </Link>
        </section>
        <hr className="md:hidden" />
        <section className="md:w-2/3 flex flex-col gap-8">
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <Button
              title="Envoyer un message à l'utilisateur"
              background="bg-dark-colored-background"
              textColor="text-foreground-inverted"
              icon={null}
            />
            <Button
              title="Supprimer le commentaire"
              background="bg-background-danger"
              textColor="text-foreground"
              icon={null}
            />
            <Button
              title="Bannir l'utilisateur"
              background="bg-background-danger"
              textColor="text-foreground"
              icon={null}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Signalement anonyme : </p>
            <p>{report.reason}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
