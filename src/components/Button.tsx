"use client";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

type ButtonProps = {
  title: string;
  background: string;
  textColor: string;
  icon: React.ReactNode | null;
  priority?: "high" | "medium" | "low";
  onClick?: () => void;
  href?: string;
  minWidth?: boolean;
  disabled?: boolean;
};

export default function Button({
  title,
  background,
  textColor,
  icon: Icon,
  priority = "high",
  onClick,
  href,
  minWidth = false,
  disabled = false,
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
      // redirect(href);
    } else if (onClick) {
      onClick();
    }
  };

  const priorityClass = {
    high: "bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold",
    medium: `bg-transparent border border-2 py-2 px-4 h-min rounded-md font-semibold`,
    low: "bg-transparent",
  }[priority ?? "high"];

  textColor =
    textColor === "text-foreground-inverted" &&
    (priority === "medium" || priority === "low")
      ? "text-foreground"
      : textColor;

  const classNames = clsx(
    `flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer ${
      minWidth ? "w-min" : ""
    }`,
    background,
    textColor,
    priorityClass
  );

  return (
    <button onClick={handleClick} className={classNames} disabled={disabled}>
      {Icon}
      {title}
    </button>
  );
}
