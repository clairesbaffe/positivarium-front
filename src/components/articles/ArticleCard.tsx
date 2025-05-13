import { SimpleArticle } from "@/lib/definitions";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function ArticleCard({ article }: { article: SimpleArticle }) {
  return (
    <Link className="border border-foreground-muted rounded-2xl cursor-pointer" href={`/article/${article.id}`} >
      <div className="h-40 md:h-52 rounded-t-2xl overflow-hidden relative">
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={article.main_image}
          alt={article.title}
        />
        <p className="absolute top-3 right-3 bg-background-muted text-foreground text-sm px-3 py-1 rounded-xl">
          {article.category.name}
        </p>
      </div>
      <div className="px-4 py-2">
        <h3 className="font-bold line-clamp-2">{article.title}</h3>
        {/* description */}
        <div className="flex justify-between">
          <p>{article.username}</p> {/* replace with created_at */}
          <p className="flex items-center gap-1">
            <Heart strokeWidth={2} className="size-4" /> {article.likesCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
