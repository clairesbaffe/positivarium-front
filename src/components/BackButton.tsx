import { ArrowLeft } from "lucide-react";
import Button from "@/components/Button";

export default function BackButton({ url }: { url: string }) {
  return (
    <Button
      title="Retour"
      background=""
      textColor="text-foreground"
      icon={<ArrowLeft size={18} />}
      href={url}
      minWidth
    />
  );
}
