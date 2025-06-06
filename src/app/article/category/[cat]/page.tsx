import ArticlesPage from "@/components/articles/ArticlesPage";

export default async function CategoryArticles({
  params,
  searchParams
}: {
  params: Promise<{
    cat: "general" | "culture" | "tech-science" | "divertissement-lifestyle";
  }>;
  searchParams: Promise<{ page: string; }>;
}) {
  const cat = (await params).cat;
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  let categories: number[] = [];
  let title: string = "";
  switch (cat) {
    case "general":
      categories = [1, 2, 3, 4];
      title = "Actualités générales";
      break;
    case "culture":
      categories = [5, 6, 7, 8, 9, 10, 11, 12, 13];
      title = "Culture";
      break;
    case "tech-science":
      categories = [14, 15, 16, 17];
      title = "Technologies & Sciences";
      break;
    case "divertissement-lifestyle":
      categories = [18, 19, 20, 21, 22, 23, 24, 25];
      title = "Divertissement & Lifestyle";
      break;
    default:
      title = "Aucune catégorie n'est définie";
      break;
  }

    return (
      <div className="flex flex-col my-8 md:m-24 gap-32">
        <section className="flex flex-col gap-8 mx-8 md:m-0">
          <h1 className="font-title text-2xl md:text-4xl">{title}</h1>
          <ArticlesPage
            endpoint={`/articles/categories${
              categories.length > 0 ? `?categoryIds=${categories.join(",")}` : ""
            }`}
            url={`/article/category/${cat}`}
            currentPage={currentPage}
          />
        </section>
      </div>
    );
}
