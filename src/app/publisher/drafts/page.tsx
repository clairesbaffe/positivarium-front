import { Plus } from "lucide-react";
import Button from "@/components/Button";
import DraftsPage from "@/components/publisher/drafts/DraftsPage";

export default async function Drafts({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="flex flex-col my-8 md:m-24 gap-32">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <h1 className="font-title text-2xl md:text-4xl">Mes brouillons</h1>
          <Button
            title="Créer un nouveau brouillon"
            background="bg-dark-colored-background"
            textColor="text-foreground-inverted"
            icon={<Plus />}
            href="/publisher/drafts/create"
          />
        </div>
        <DraftsPage currentPage={currentPage} />
      </section>
    </div>
  );
}
