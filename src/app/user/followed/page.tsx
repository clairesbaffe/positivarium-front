import FollowedPublishersPage from "@/components/user/follow/FollowedPublishersPage";

export default async function UserFollowedPublishersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="mx-4 my-16 md:w-2/5 md:mx-auto">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">Rédacteurs suivis</h1>
        <FollowedPublishersPage currentPage={currentPage} />
      </section>
    </div>
  );
}
