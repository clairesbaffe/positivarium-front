import { CircleUserRound } from "lucide-react";
import Button from "@/components/Button";

export default function ToLoginPageButton({
  title,
  next,
}: {
  title: string;
  next: string;
}) {
  return (
    <Button
      title={title}
      background={"bg-colored-background"}
      textColor={"text-foreground"}
      icon={<CircleUserRound size={18} />}
      href={`/login?next=${next}`}
    />
  );
}
