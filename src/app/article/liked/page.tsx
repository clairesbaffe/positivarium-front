import ArticlesPage from "@/components/articles/ArticlesPage";

export const dynamic = 'force-dynamic';

export default async function LikedArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="flex flex-col my-8 md:m-24 gap-32">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">Articles likés</h1>
        <ArticlesPage
          endpoint={`/likes/articles`}
          url={`/article/liked`}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
}
