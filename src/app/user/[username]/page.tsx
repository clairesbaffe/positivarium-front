import { User } from "@/lib/definitions";
import { getPublisher } from "@/lib/data";
import ArticlesPage from "@/components/articles/ArticlesPage";
import FollowButton from "@/components/users/FollowButton";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const username = (await params).username;
  const currentPage = (await searchParams).page || 1;

  const user: User = await getPublisher(username);

  return (
    <div className="flex flex-col my-8 md:m-40">
      {user ? (
        <div className="flex flex-col gap-8 mx-8 md:m-0">
          <section className="flex flex-col gap-6">
            <div className="flex items-end gap-6">
              <h1 className="font-title text-3xl md:text-5xl">
                {user.username}
              </h1>
              <FollowButton publisher={user} />
            </div>
            {user.description && <p className="text-lg">{user.description}</p>}
          </section>
          <section>
            <ArticlesPage
              endpoint={`/articles/published/${user.username}`}
              url={`/user/${username}`}
              size="large"
              currentPage={Number(currentPage)}
            />
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
