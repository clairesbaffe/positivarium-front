import { Category } from "@/lib/definitions";
import { useState } from "react";

export default function CategorySelector({
  categories,
  onChange,
  multiple = true,
}: {
  categories: Category[];
  onChange?: (selected: Category[]) => void;
  multiple?: boolean;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const grouped = categories.reduce<
    Record<Category["generalCategory"], Category[]>
  >((acc, cat) => {
    acc[cat.generalCategory] ||= [];
    acc[cat.generalCategory].push(cat);
    return acc;
  }, {} as Record<Category["generalCategory"], Category[]>);

  const toggleCategory = (cat: Category) => {
    let newSelected: number[];

    if (multiple) {
      newSelected = selectedIds.includes(cat.id)
        ? selectedIds.filter((id) => id !== cat.id)
        : [...selectedIds, cat.id];
    } else {
      newSelected = selectedIds.includes(cat.id) ? [] : [cat.id];
    }

    setSelectedIds(newSelected);
    onChange?.(categories.filter((cat) => newSelected.includes(cat.id)));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.entries(grouped).map(([generalCategory, categories]) => (
        <fieldset key={generalCategory} className="border rounded p-4">
          <legend className="text-sm font-semibold uppercase text-muted-foreground">
            {generalCategory}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type={multiple ? "checkbox" : "radio"}
                  name={multiple ? undefined : "single-category-selector"}
                  className="accent-dark-colored-background"
                  checked={selectedIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
