"use client";

import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type ButtonProps = {
  title: string;
  background: string;
  textColor: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
};

export default function Button({
  title,
  background,
  textColor,
  icon: Icon,
  onClick,
  href,
}: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "py-2.5 px-4 h-min rounded-md font-semibold flex items-center gap-2 cursor-pointer",
        background,
        textColor
      )}
    >
      <Icon size={18} />
      {title}
    </button>
  );
}
