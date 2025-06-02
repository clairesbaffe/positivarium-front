import { UserDetails } from "@/lib/definitions";
import { getCurrentUser } from "@/lib/auth";
import { roleData } from "@/lib/utils";

import ArticlesPage from "@/components/articles/ArticlesPage";
import UpdateInfoButton from "@/components/profile/UpdateInfoButton";
import UpdatePasswordButton from "@/components/profile/UpdatePasswordButton";
import Button from "@/components/Button";

// if not connected, user is automatically redirected to login by middleware
export default async function MyProfile({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = (await searchParams).page || 1;

  const user: UserDetails = await getCurrentUser();

  return (
    <div className="flex flex-col gap-8 m-8 md:m-40">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
          <div className="flex gap-6 items-end">
            <h1 className="font-title text-3xl md:text-5xl">{user.username}</h1>
            <div className="flex gap-2">
              {user.roles.map((role) => {
                const { name, bg, color } = roleData(role);
                return (
                  <p
                    key={role}
                    className={`${bg} ${color} py-1 px-3 rounded-full w-min`}
                  >
                    {name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            {user.roles.includes("ROLE_USER") && (
              <Button
                title="Gérer mes préférences de feed"
                background="bg-dark-colored-background"
                textColor="text-foreground-inverted"
                icon={null}
                href="/profile/news_preferences"
              />
            )}
            <UpdateInfoButton user={user} />
            <UpdatePasswordButton user={user} />
          </div>
        </div>
        <p className="text-lg font-semibold">{user.email}</p>
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
