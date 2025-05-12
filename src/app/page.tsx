import Button from "@/components/Button";
import { BookOpen, Layers2, NotebookPen } from "lucide-react";
import ArticlesPage from "@/components/articles/ArticlesPage";

export default async function Home() {


  return (
    <main className="flex flex-col my-8 md:m-28 gap-32">
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-20">
        <div className="flex flex-col gap-6 mx-8 md:m-0">
          <h1 className="font-title text-2xl md:text-4xl">
            Parce que le positif mérite d'être partagé
          </h1>
          <p className="md:text-xl">
            Un concentré de bonnes nouvelles et d'inspirations, sélectionnées
            pour illuminer votre quotidien et nourrir votre optimisme.
          </p>
          <div className="flex flex-col md:flex-row gap-5">
            <Button
              title={"Commencer à lire"}
              background={"bg-dark-colored-background"}
              textColor={"text-foreground-inverted"}
              icon={BookOpen}
            />
            <Button
              title={"Ouvrir le journal"}
              background={"bg-colored-background"}
              textColor={"text-foreground"}
              icon={NotebookPen}
            />
          </div>
        </div>
        <img
          className="md:w-2/5"
          src="https://images.unsplash.com/photo-1533150783171-ce47d5c2b6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Vue d'ensemble de l'île et du plan d'eau"
        />
      </section>
      <section className="flex flex-col gap-4 mx-8 md:m-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex flex-col gap-2">
            <h2 className="font-title text-xl md:text-3xl">
              Les histoires positives du jour
            </h2>
            <p className="md:text-xl">
              Des nouvelles inspirantes venues des quatre coins du monde
            </p>
          </div>
          <Button
            title={"Voir toutes les catégories"}
            background={"bg-colored-background"}
            textColor={"text-foreground"}
            icon={Layers2}
          />
        </div>
        <ArticlesPage/>
      </section>
    </main>
  );
}
