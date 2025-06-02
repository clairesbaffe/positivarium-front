import { SimpleArticle } from "@/lib/definitions";
import DraftCard from "@/components/publisher/drafts/DraftCard";

export default function DraftsList({ drafts }: { drafts: SimpleArticle[] }) {
  return (
    <ul className="grid md:grid-cols-1 gap-4" id="drafts-list">
      {drafts.map((article) => (
        <DraftCard key={article.id} draft={article} />
      ))}
    </ul>
  );
}
