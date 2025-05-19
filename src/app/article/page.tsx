"use client";

import { useSearchParams } from "next/navigation";
import ArticlesPage from "@/components/articles/ArticlesPage";

export default function CategoryArticles() {
  const searchParams = useSearchParams();

  const cat = searchParams.get("cat");

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
    <main className="flex flex-col my-8 md:m-24 gap-32">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">{title}</h1>
        <ArticlesPage
          endpoint={`/articles/categories${
            categories.length > 0 ? `?categoryIds=${categories.join(",")}` : ""
          }`}
          url={`/article?cat=${cat}`}
        />
      </section>
    </main>
  );
}
