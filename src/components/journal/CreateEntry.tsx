"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, JournalEntry, Mood } from "@/lib/definitions";
import { createEntry } from "@/lib/actions";

import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import TodaysEntry from "@/components/journal/TodaysEntry";
import MoodSelector from "@/components/journal/MoodSelector";
import CategorySelector from "@/components/CategorySelector";

export default function CreateEntry({
  moods,
  categories,
  todaysEntry,
}: {
  moods: Mood[];
  categories: Category[];
  todaysEntry: JournalEntry;
}) {
  if (todaysEntry) {
    return (
      <div className="mt-6">
        <TodaysEntry
          todaysEntry={todaysEntry}
          moods={moods}
          categories={categories}
        />
      </div>
    );
  }

  const router = useRouter();

  const [content, setContent] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleClick = async () => {
    const res = await createEntry(content, selectedMoods, selectedCategories);

    if (!res.success) {
      const errorData = res.error;
      console.error(errorData?.error || "Échec de l'action");
      toast.error(errorData?.error || "Échec de l'action.");
      return;
    }

    toast.success("Entrée ajoutée avec succès");
    router.push(`/journal`);
  };

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div>
        <h2 className="font-title text-2xl md:text-3xl">
          Journal d'aujourd'hui
        </h2>
        <p>
          Écrivez sur votre journée, vos sentiments et le contenu que vous
          aimeriez voir
        </p>
      </div>

      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-semibold">
            A quoi pensez-vous aujourd'hui ?
          </label>
          <Textarea
            name="content"
            data={content}
            setData={setContent}
            placeholder="Écrivez vos pensées ici..."
            height="lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Comment vous sentez-vous aujourd'hui ?
          </label>
          <MoodSelector
            moods={moods}
            onChange={setSelectedMoods}
            selectedMoodIds={[]}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-semibold">
            Qu'aimeriez-vous voir dans votre feed ?
          </label>
          <CategorySelector
            categories={categories}
            onChange={setSelectedCategories}
          />
        </div>

        <Button
          title={"Enregistrer"}
          background={"bg-dark-colored-background"}
          textColor={"text-foreground-inverted"}
          icon={<Save size={18} />}
          onClick={() => handleClick()}
          minWidth
        />
      </form>
    </div>
  );
}
