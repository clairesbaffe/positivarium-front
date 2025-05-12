import { Article } from "@/lib/definitions";
import { Heart } from "lucide-react";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border rounded-2xl">
      <div className="h-40 md:h-52 rounded-t-2xl overflow-hidden relative">
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={article.main_image}
          alt={article.title}
        />
        <p className="absolute top-3 right-3 bg-white/75 text-sm text-black px-3 py-1 rounded-xl">
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
    </div>
  );
}
