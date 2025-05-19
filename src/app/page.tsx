"use client";

import Button from "@/components/Button";
import {
  BookOpen,
  Layers2,
  NotebookPen,
  SquarePen,
  UserRoundPen,
} from "lucide-react";
import ArticlesPage from "@/components/articles/ArticlesPage";

export default function Home() {
  return (
    <main className="flex flex-col my-8 md:m-24 gap-32">
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
              href={"#articles-list"}
            />
            <Button
              title={"Ouvrir le journal"}
              background={"bg-colored-background"}
              textColor={"text-foreground"}
              icon={NotebookPen}
              href={"/"}
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
            href={"/"}
          />
        </div>
        <ArticlesPage endpoint="/articles/" url="/" />
      </section>
      <section className="mx-8 grid md:grid-cols-2 gap-8 md:gap-4">
        <div className="rounded-lg">
          <div className="p-4 bg-dark-colored-background text-foreground-inverted rounded-t-lg flex flex-col gap-1">
            <h3 className="font-title text-xl">Votre journal quotidien</h3>
            <p>
              Réfléchissez sur votre journée et personnalisez votre fil
              d'actualités positif
            </p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <h4>Pourquoi tenir un journal ?</h4>
              <ul className="list-disc pl-5">
                <li>Suivez votre bien-être émotionnel au fil du temps</li>
                <li>Réfléchissez à vos expériences quotidiennes</li>
                <li>
                  Personnalisez votre fil d'actualités en fonction de vos
                  centres d'intérêt
                </li>
                <li>
                  Découvrez du contenu qui résonne avec votre humeur actuelle
                </li>
              </ul>
            </div>
            <aside className="bg-colored-background dark:text-foreground-inverted rounded p-4 flex flex-col gap-1">
              <p className="italic">
                "Écrire dans mon journal m'a non seulement aidée à traiter mes
                pensées, mais a également amélioré la qualité des informations
                que je vois chaque jour."
              </p>
              <p className="font-semibold">
                — Sarah K., utilisatrice du Positivarium
              </p>
            </aside>
            <Button
              title={"Écrivez dans votre journal"}
              background={"bg-dark-colored-background"}
              textColor={"text-foreground-inverted"}
              icon={SquarePen}
              href={"/"}
            />
          </div>
        </div>
        <div className="rounded-lg">
          <div className="p-4 bg-colored-background dark:text-foreground-inverted rounded-t-lg flex flex-col gap-1">
            <h3 className="font-title text-xl">Devenez rédacteur</h3>
            <p>Partagez vos histoires positives avec notre communauté</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <h4>Les avantages de devenir rédacteur</h4>
              <ul className="list-disc pl-5">
                <li>
                  Partagez des histoires inspirantes avec un public plus large
                </li>
                <li>
                  Construisez votre marque personnelle en tant que créateur
                  positif
                </li>
                <li>
                  Connectez-vous avec des personnes partageant les mêmes idées
                </li>
                <li>Contribuez à un paysage médiatique plus positif</li>
              </ul>
            </div>
            <aside className="bg-colored-background dark:text-foreground-inverted rounded p-4 flex flex-col gap-1">
              <p className="italic">
                "Avoir la possibilité de publier mes propres histoires positives
                a été très gratifiant. Je me suis connecté avec tant de
                personnes qui apprécient les bonnes nouvelles."
              </p>
              <p className="font-semibold">
                — Michael T., rédacteur du Positivarium
              </p>
            </aside>
            <Button
              title={"Demandez à devenir rédacteur"}
              background={"bg-colored-background"}
              textColor={"text-foreground dark:text-foreground-inverted"}
              icon={UserRoundPen}
              href={"/"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
