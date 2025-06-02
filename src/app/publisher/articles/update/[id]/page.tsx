import { Article } from "@/lib/definitions";
import { getArticleById, getCategories } from "@/lib/data";
import CreateForm from "@/components/publisher/drafts/CreateForm";

export default async function UpdateArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const article: Article = await getArticleById(Number(id));

  const categories = await getCategories();

  return (
    <div className="flex flex-col my-8 md:w-2/3 md:m-auto md:my-12">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <CreateForm categories={categories} article={article} isPublished />
      </section>
    </div>
  );
}
