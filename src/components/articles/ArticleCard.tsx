import { SimpleArticle } from "@/lib/definitions";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function ArticleCard({
  article,
  large = false,
}: {
  article: SimpleArticle;
  large?: boolean;
}) {
  return (
    <Link
      className={`border border-foreground-muted rounded-2xl cursor-pointer ${
        large ? "md:col-span-3" : ""
      }`}
      href={`/article/${article.id}`}
    >
      <div
        className={`${
          large ? "h-40 md:h-92" : "h-40 md:h-52"
        } rounded-t-2xl overflow-hidden relative`}
      >
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={article.mainImage}
          alt={article.title}
        />
        <p className="absolute top-3 right-3 bg-background-muted text-foreground text-sm px-3 py-1 rounded-xl">
          {article.category.name}
        </p>
      </div>
      <div className="px-4 py-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold line-clamp-2">{article.title}</h3>
          <p className="line-clamp-3">{article.description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-foreground-muted text-sm">
            {new Date(article.publishedAt).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p className="flex items-center gap-1">
            <Heart strokeWidth={2} className="size-4" /> {article.likesCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
