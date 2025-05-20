import { getCurrentUser } from "@/lib/auth";

import ArticlesPage from "@/components/articles/ArticlesPage";
import UpdateInfoButton from "@/components/profile/UpdateInfoButton";

// if not connected, user is automatically redirected to login by middleware
export default async function MyProfile({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = (await searchParams).page || 1;

  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-8 m-8 md:m-40">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-6">
            <h1 className="font-title text-3xl md:text-5xl">{user.username}</h1>
            <UpdateInfoButton user={user} />
          </div>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        {user.description && <p className="text-lg">{user.description}</p>}
      </section>
      <section>
        {user.roles.includes("ROLE_PUBLISHER") && (
          <ArticlesPage
            endpoint={`/articles/published/${user.username}`}
            url={`/user/${user.username}`}
            size="large"
            currentPage={Number(currentPage)}
          />
        )}
      </section>
      {/* Comments */}
    </div>
  );
}
