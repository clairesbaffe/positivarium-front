import ArticlesPage from "@/components/articles/ArticlesPage";
import { getCurrentUser } from "@/lib/auth";
import { UserDetails } from "@/lib/definitions";

export default async function PublishedArticles({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  const user: UserDetails = await getCurrentUser();
  
  return (
    <div className="flex flex-col my-8 md:m-24 gap-32">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">Mes articles publiés</h1>
        <ArticlesPage
          endpoint={`/articles/published/${user.username}`}
          url={`/publisher/articles`}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
}
