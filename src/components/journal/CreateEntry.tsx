"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Mood } from "@/lib/definitions";
import { createEntry } from "@/lib/actions";

import { toast } from "react-toastify";
import { Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import MoodSelector from "@/components/MoodSelector";
import CategorySelector from "@/components/CategorySelector";

export default function CreateEntry({
  moods,
  categories,
}: {
  moods: Mood[];
  categories: Category[];
}) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleClick = async () => {
    try {
      const res = await createEntry(content, selectedMoods, selectedCategories);
      toast.success("Entrée ajoutée avec succès");
      router.push(`/journal`);
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
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
          <p>
            Indiquez votre humeur du jour et choisissez les catégories
            d'articles que vous voulez voir dans votre fil. Si vous avez
            enregistré des préférences liées à certaines humeurs, les catégories
            peuvent être sélectionnées automatiquement.
          </p>
          <p>
            Vous pouvez aussi faire vos choix librement, selon ce que vous avez
            envie de lire aujourd'hui.
          </p>
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

        <Accordion type="single" className="border rounded p-4 py-2" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <label htmlFor="" className="font-semibold">
                  Qu'aimeriez-vous voir dans votre fil d'actualités ?
                </label>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div>
                <h6 className="font-semibold">Personnalisez votre fil</h6>
                <p>
                  Les catégories que vous sélectionnez ici serviront à adapter
                  votre fil d'actualités du jour selon vos envies ou votre
                  humeur.
                </p>
              </div>
              <CategorySelector
                categories={categories}
                onChange={setSelectedCategories}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
