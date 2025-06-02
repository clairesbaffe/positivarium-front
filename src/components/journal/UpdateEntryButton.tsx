import { useState } from "react";
import { Category, JournalEntry, Mood } from "@/lib/definitions";
import { updateEntry } from "@/lib/actions";

import { toast } from "react-toastify";
import { Save, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/Textarea";
import CategorySelector from "@/components/CategorySelector";
import MoodSelector from "@/components/MoodSelector";

export default function UpdateEntryButton({
  entry,
  moods,
  categories,
}: {
  entry: JournalEntry;
  moods: Mood[];
  categories: Category[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [description, setDescription] = useState(entry.description);
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>(entry.moods);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    entry.categories
  );

  const handleUpdate = async () => {
    try {
      await updateEntry(
        entry.id,
        description,
        selectedMoods,
        selectedCategories
      );
      toast.success("Entrée mise à jour avec succès");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={`bg-dark-colored-background text-foreground-inverted flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer py-2.5 px-4 h-min rounded-md font-semibold`}
        onClick={() => setIsDialogOpen(true)}
      >
        <SquarePen size={18} /> Modifier
      </DialogTrigger>
      <DialogContent className="sm:max-w-3/5 max-h-3/5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier l'entrée du{" "}
            {new Date(entry.createdAt).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold text-lg">
              A quoi pensez-vous ?
            </label>
            <Textarea
              name="description"
              data={description}
              setData={setDescription}
              height="lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold text-lg">
              Comment vous sentez-vous ?
            </label>
            <MoodSelector
              moods={moods}
              selectedMoodIds={entry.moods.map((mood) => mood.id)}
              onChange={setSelectedMoods}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold text-lg">
              Qu'aimeriez-vous voir dans votre feed ?
            </label>
            <CategorySelector
              categories={categories}
              defaultSelectedCategoryIds={entry.categories.map((cat) => cat.id)}
              onChange={setSelectedCategories}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer"
            onClick={() => handleUpdate()}
          >
            <Save size={18} />
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
