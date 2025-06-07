import { Category, JournalEntry, Mood } from "@/lib/definitions";
import { getCategories, getMoods, getTodaysEntry } from "@/lib/data";

import { Heart, Sparkles, CalendarCheck2, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateEntry from "@/components/journal/CreateEntry";
import EntriesPage from "@/components/journal/EntriesPage";
import TodaysEntry from "@/components/journal/TodaysEntry";
import Button from "../Button";

export default async function JournalConnected({
  currentTab,
  currentPage,
}: {
  currentTab: string;
  currentPage: number;
}) {
  const moods: Mood[] = await getMoods();
  const categories: Category[] = await getCategories();

  const todaysEntry: JournalEntry = await getTodaysEntry();

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-title text-2xl md:text-4xl">Mon Journal</h1>
        <p className="md:text-xl">
          Prenez un moment pour réfléchir à votre journée et façonnez votre fil
          d'actualités positif
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <Tabs defaultValue={currentTab} className="md:col-span-3">
          <TabsList className="grid w-full h-auto md:h-12 gap-4 md:grid-cols-2">
            <TabsTrigger value="today" className="text-md cursor-pointer">
              Ecrire une entrée pour aujourd'hui
            </TabsTrigger>
            <TabsTrigger value="past" className="text-md cursor-pointer">
              Voir les entrées
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            {todaysEntry ? (
              <div className="mt-6">
                <TodaysEntry
                  todaysEntry={todaysEntry}
                  moods={moods}
                  categories={categories}
                />
              </div>
            ) : (
              <CreateEntry moods={moods} categories={categories} />
            )}
          </TabsContent>
          <TabsContent value="past">
            <EntriesPage currentPage={currentPage} />
          </TabsContent>
        </Tabs>
        <aside className="flex flex-col gap-6">
          <div className="border border-foreground-muted rounded-2xl p-4 flex flex-col gap-3">
            <h3 className="font-title text-2xl">Bénéfices d'un journal</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Heart size={28} />{" "}
                <p className="w-full">
                  Suivez votre bien-être émotionnel au fil du temps
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={28} />
                <p className="w-full">
                  Découvrez du contenu qui correspond à votre humeur du moment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck2 size={28} />{" "}
                <p className="w-full">
                  Découvrez une pratique de réflexion cohérente
                </p>
              </div>
            </div>
          </div>
          <Button
            title="Configurer mes préférences"
            background="bg-colored-background"
            textColor="text-foreground"
            icon={<Wrench size={18} />}
            href="/profile/news_preferences?back=/journal"
          />
        </aside>
      </div>
    </section>
  );
}
