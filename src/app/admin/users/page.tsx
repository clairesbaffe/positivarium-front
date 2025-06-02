import UsersPage from "@/components/admin/UsersPage";

export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  return (
    <div className="flex flex-col mx-4 my-16 md:w-2/5 md:mx-auto">
      <section className="flex flex-col gap-8 mx-8 md:m-0">
        <h1 className="font-title text-2xl md:text-4xl">Utilisateurs</h1>
        <UsersPage currentPage={currentPage} url="/admin/users" />
      </section>
    </div>
  );
}
