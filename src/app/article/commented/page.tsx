import ArticlesWithCommentsPage from "@/components/articles/ArticlesWithCommentsPage";

export default async function CommentedArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="flex flex-col my-8 md:mx-52 md:my-24 gap-32">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">Articles commentés</h1>
        <ArticlesWithCommentsPage
          endpoint={`/comments/`}
          url={`/article/commented`}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
}
