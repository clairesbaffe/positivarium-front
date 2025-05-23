import { getArticleReportById } from "@/lib/data";
import { ArticleReport } from "@/lib/definitions";

import Link from "next/link";
import Button from "@/components/Button";
import MarkAsReadButton from "@/components/admin/reports/MarkAsReadButton";
import { Badge } from "@/components/ui/badge";

export default async function ArticleReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const report: ArticleReport = await getArticleReportById(Number(id));

  return (
    <div className="md:w-3/5 mx-4 md:mx-auto my-16 flex flex-col gap-8">
      <div className="flex gap-6 items-center">
        <h1 className="font-title text-3xl">Signalement d'un article</h1>
        {report.isReviewed && (
          <Badge variant="outline" className="text-xl">
            Traité
          </Badge>
        )}
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-8">
        <section className="md:w-1/3 border border-foreground-muted rounded-lg">
          <Link
            href={`/article/${report.article.id}`}
            className="flex flex-col"
          >
            <img
              src={report.article.mainImage}
              alt={report.article.title}
              className="rounded-t-lg"
            />
            <div className="flex flex-col gap-4 p-4">
              <h3 className="text-lg font-bold">{report.article.title}</h3>
              <div className="flex flex-col gap-2">
                <p>{report.article.username}</p>
                <p>{report.article.description}</p>
              </div>
            </div>
          </Link>
        </section>
        <hr className="md:hidden" />
        <section className="md:w-2/3 flex flex-col gap-8">
          {!report.isReviewed && (
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Button
                title="Envoyer un message à l'utilisateur"
                background="bg-dark-colored-background"
                textColor="text-foreground-inverted"
                icon={null}
              />
              <Button
                title="Supprimer l'article"
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
          )}
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Signalement anonyme : </p>
            <p>{report.reason}</p>
          </div>
          {!report.isReviewed && (
            <MarkAsReadButton reportId={report.id} reportType="article" />
          )}
        </section>
      </div>
    </div>
  );
}
