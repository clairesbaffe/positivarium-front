"use client";

import { useState } from "react";
import { Category, GlobalPreference, Mood } from "@/lib/definitions";
import { addOrUpdateGlobalPreference } from "@/lib/actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoodSelector from "@/components/MoodSelector";
import CategorySelector from "@/components/CategorySelector";

export default function AddOrUpdateGlobalPreferenceButton({
  moods,
  categories,
  preference,
}: {
  moods: Mood[];
  categories: Category[];
  preference?: GlobalPreference;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(
    preference ? [preference.mood] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    preference?.categories || []
  );

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleClick = async () => {
    try {
      if (selectedMoods.length === 0 || selectedCategories.length === 0) {
        throw new Error("INPUTS_MISSING");
      }

      await addOrUpdateGlobalPreference(
        selectedMoods[0],
        selectedCategories,
        preference?.id
      );

      setMessage({ message: "", type: "success" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message:
              "Veuillez sélectionner une humeur et au moins une catégorie.",
            type: "error",
          });
        } else {
          setMessage({ message: "Une erreur est survenue.", type: "error" });
        }
      } else {
        setMessage({ message: "Erreur inattendue.", type: "error" });
      }
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger
          className={`bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold bg-dark-colored-background text-foreground-inverted cursor-pointer`}
          onClick={() => setIsDialogOpen(true)}
        >
          {preference ? (
            <SquarePen />
          ) : (
            <div className="flex items-center justify-center whitespace-nowrap gap-2">
              <Plus size={18} />
              Ajouter une préférence
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-3/5 max-h-4/5 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {preference ? "Mettre à jour" : "Ajouter"} une préférence de feed
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Choisissez une humeur (comme "heureux", "fatigué", "motivé"…) et
            associez-lui les catégories d'articles qui vous font du bien dans
            ces moments-là. Ainsi, la prochaine fois que vous enregistrerez
            cette humeur dans votre journal, votre fil d'actualités s'adaptera
            automatiquement à vos envies.
          </DialogDescription>
          <div className="flex flex-col gap-8 py-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-lg">
                Pour quelle humeur...
              </label>
              <MoodSelector
                moods={moods}
                onChange={setSelectedMoods}
                selectedMoodIds={selectedMoods.map((mood) => mood.id)}
                multiple={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-lg">
                Voulez-vous voir ces catégories dans votre feed principal ?
              </label>
              <CategorySelector
                categories={categories}
                onChange={setSelectedCategories}
                defaultSelectedCategoryIds={selectedCategories.map(
                  (cat) => cat.id
                )}
              />
            </div>
          </div>
          {message && message.type === "error" && (
            <p className="text-red-400">{message.message}</p>
          )}
          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleClick()}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
