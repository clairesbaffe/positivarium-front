import { useState } from "react";
import { Mood } from "@/lib/definitions";

export default function MoodSelector({
  moods,
  selectedMoodIds,
  onChange,
  multiple = true,
}: {
  moods: Mood[];
  selectedMoodIds: number[];
  onChange: (selected: Mood[]) => void;
  multiple?: boolean;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>(selectedMoodIds);

  const grouped = moods.reduce<Record<Mood["type"], Mood[]>>((acc, mood) => {
    acc[mood.type] ||= [];
    acc[mood.type].push(mood);
    return acc;
  }, {} as Record<Mood["type"], Mood[]>);

  const toggleMood = (mood: Mood) => {
    let newSelected: number[];

    if (multiple) {
      newSelected = selectedIds.includes(mood.id)
        ? selectedIds.filter((id) => id !== mood.id)
        : [...selectedIds, mood.id];
    } else {
      newSelected = selectedIds.includes(mood.id) ? [] : [mood.id];
    }

    setSelectedIds(newSelected);
    onChange?.(moods.filter((m) => newSelected.includes(m.id)));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.entries(grouped).map(([type, moods]) => (
        <fieldset key={type} className="border rounded p-4">
          <legend className="text-sm font-semibold uppercase text-muted-foreground">
            {type}
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {moods.map((mood) => (
              <label
                key={mood.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={multiple ? undefined : "single-category-selector"}
                  className="accent-dark-colored-background"
                  checked={selectedIds.includes(mood.id)}
                  onChange={() => toggleMood(mood)}
                />
                <span>{mood.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
