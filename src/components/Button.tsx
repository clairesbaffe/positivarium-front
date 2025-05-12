import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type ButtonProps = {
  title: string;
  background: string;
  textColor: string;
  icon: LucideIcon;
};

export default function Button({ title, background, textColor, icon: Icon }: ButtonProps) {
  return (
    <button
    className={clsx(
        "py-2.5 px-4 rounded-md font-semibold flex items-center gap-2",
        background,
        textColor
      )}
    >
      <Icon size={18} />
      {title}
    </button>
  );
}
