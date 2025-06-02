import { SimpleArticle } from "@/lib/definitions";
import Link from "next/link";

export default function DraftCard({ draft }: { draft: SimpleArticle }) {
  return (
    <Link
      className={`grid md:grid-cols-3 border border-foreground-muted rounded-2xl cursor-pointer`}
      href={`/publisher/drafts/${draft.id}`}
    >
      <div
        className={`rounded-t-2xl md:rounded-t-none md:rounded-l-2xl overflow-hidden relative`}
      >
        <img
          className="h-full min-h-60 max-h-72 w-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
          src={draft.mainImage}
          alt={draft.title}
        />
        <p className="absolute top-3 right-3 bg-background-muted text-foreground text-sm px-3 py-1 rounded-xl">
          {draft.category.name}
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="px-4 py-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold line-clamp-2">{draft.title}</h3>
            <p className="line-clamp-2">{draft.description}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-foreground-muted text-sm">
              {new Date(draft.createdAt).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
