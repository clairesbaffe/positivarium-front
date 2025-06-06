import { getCategories, getMoods, getUserGlobalPreferences } from "@/lib/data";

import BackButton from "@/components/BackButton";
import GlobalPreferencesTable from "@/components/profile/global_preferences/GlobalPreferencesTable";
import AddOrUpdateGlobalPreferenceButton from "@/components/profile/global_preferences/AddOrUpdateGlobalPreferenceButton";

export default async function NewsPreferences({
  searchParams,
}: {
  searchParams: Promise<{ page: string; back: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);
  const back = (await searchParams).back ?? "/profile";

  const { preferences, totalPages } = await getUserGlobalPreferences(
    currentPage
  );

  const moods = await getMoods();
  const categories = await getCategories();

  return ( 
    <div className="flex flex-col my-8 md:w-2/3 md:mx-auto md:my-20 gap-4">
      <BackButton url={back} />
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <h1 className="font-title text-2xl md:text-4xl">
              Mes préférences de feed
            </h1>
            <AddOrUpdateGlobalPreferenceButton
              moods={moods}
              categories={categories}
            />
          </div>
          {preferences && preferences.length > 0 ? (
            <div>
              <p>
                Voici les humeurs que vous avez associées à certaines catégories
                d'articles.
              </p>
              <p>
                Quand vous entrez une nouvelle humeur dans votre journal, on
                affiche automatiquement les types d'articles que vous aimez lire
                dans cet état d'esprit.
              </p>
              <p>
                Vous pouvez modifier ces associations à tout moment, ou en
                ajouter d'autres.
              </p>
            </div>
          ) : (
            <div>
              <p>
                Créez des "profils d'humeur" pour que votre fil d'actualités
                s'adapte automatiquement à votre état d'esprit du jour.
              </p>
              <p>
                Par exemple : "Quand je me sens stressé·e, je veux voir des
                histoires de nature et d'animaux".
              </p>
              <p>Ajoutez votre première configuration !</p>
            </div>
          )}
        </div>
        <GlobalPreferencesTable
          preferences={preferences}
          currentPage={currentPage}
          totalPages={totalPages}
          url="/profile/news_preferences"
          moods={moods}
          categories={categories}
        />
      </section>
    </div>
  );
}
