import { redirect } from "next/navigation";
import { UserDetails } from "@/lib/definitions";
import { getCurrentUser } from "@/lib/auth";
import { getUser } from "@/lib/data";
import { roleData } from "@/lib/utils";

import ArticlesPage from "@/components/articles/ArticlesPage";
import BanButton from "@/components/admin/BanButton";
import GrantAdminButton from "@/components/admin/GrantAdminButton";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const connectedUser = await getCurrentUser();

  const username = (await params).username;
  const currentPage = parseInt((await searchParams).page ?? "1", 10);

  const user: UserDetails = await getUser(username);

  if (connectedUser.username === username) redirect("/profile");

  return (
    <div className="flex flex-col my-8 md:m-40">
      {user ? (
        <div className="flex flex-col gap-8 mx-8 md:m-0">
          <section className="flex flex-col gap-6">
            <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
              <div className="flex gap-6 items-end">
                <h1 className="font-title text-3xl md:text-5xl">
                  {user.username}
                </h1>
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
              <div className="flex gap-6 items-center">
                <BanButton user={user} />
                <GrantAdminButton user={user} />
              </div>
            </div>
            {user.description && <p className="text-lg">{user.description}</p>}
          </section>
          <section>
            {user.roles.includes("ROLE_PUBLISHER") && (
              <ArticlesPage
                endpoint={`/articles/published/${user.username}`}
                url={`/user/${username}`}
                size="large"
                currentPage={Number(currentPage)}
              />
            )}
          </section>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Cet utilisateur n'a pas été trouvé
        </div>
      )}
    </div>
  );
}
