import Link from "next/link";
import type { Article } from "@/lib/definitions";
import { getDraftById } from "@/lib/data";

import { SquarePen } from "lucide-react";
import Button from "@/components/Button";
import SanitizedContent from "@/components/SanitizedContent";
import DeleteDraftButton from "@/components/publisher/drafts/DeleteDraftButton";
import PublishDraftButton from "@/components/publisher/drafts/PublishDraftButton";

export default async function Draft({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const draft: Article = await getDraftById(Number(id));

  return (
    <div className="md:w-3/5 mx-4 md:mx-auto my-16 flex flex-col gap-8">
      {draft && (
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-thin">
                <Link href={"/"}>{draft.category.name}</Link> ·{" "}
                {draft.category.generalCategory}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <h1 className="font-title text-4xl">{draft.title}</h1>
                  <div className="flex flex-wrap md:flex-nowrap gap-4">
                    <PublishDraftButton draftId={draft.id} />
                    <Button
                      title="Modifier"
                      background="bg-dark-colored-background"
                      textColor="text-foreground-inverted"
                      icon={<SquarePen size={18} />}
                      href={`/publisher/drafts/create/${draft.id}`}
                    />
                    <DeleteDraftButton draftId={draft.id} />
                  </div>
                </div>
                <p className="text-lg">{draft.description}</p>
              </div>
              <div className="flex items-center justify-between font-thin">
                <div className="text-foreground-muted flex items-center gap-1">
                  <p>
                    {new Date(draft.createdAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {draft.updatedAt !== draft.createdAt && (
                    <p>
                      | Modifié le :{" "}
                      {new Date(draft.updatedAt).toLocaleString("fr-FR", {
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
            </div>
            <img src={draft.mainImage} alt={draft.title} />
            <SanitizedContent content={draft.content} />
          </section>
        </div>
      )}
    </div>
  );
}
