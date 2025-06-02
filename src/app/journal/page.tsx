import { UserDetails } from "@/lib/definitions";
import { getCurrentUser } from "@/lib/auth";

import { CircleUserRound } from "lucide-react";
import Button from "@/components/Button";
import JournalConnected from "@/components/journal/JournalConnected";

export default async function Journal({
  searchParams,
}: {
  searchParams: Promise<{
    tab: string;
    page: string;
  }>;
}) {
  const user: UserDetails = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col my-8 md:m-24 gap-32">
        <section className="flex flex-col gap-8 mx-8 md:m-0">
          <h1 className="font-title text-2xl md:text-4xl">Mon Journal</h1>
          <Button
            title={"Connectez-vous pour accéder à votre journal"}
            background={"bg-colored-background"}
            textColor={"text-foreground"}
            icon={<CircleUserRound size={18} />}
            href={`/login?next=/journal`}
            minWidth
          />
        </section>
      </div>
    );
  }

  const currentTab = (await searchParams).tab ?? "today";
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="flex flex-col mx-4 my-8 md:m-24 gap-32">
      <JournalConnected currentTab={currentTab} currentPage={currentPage} />
    </div>
  );
}
