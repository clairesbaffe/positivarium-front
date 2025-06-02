import { getUsers } from "@/lib/data";

import PaginationControls from "@/components/Pagination";
import UsersList from "./UsersList";

export default async function UsersPage({
  currentPage,
  url,
}: {
  currentPage: number;
  url: string;
}) {
  const data = await getUsers(currentPage);
  const users = data.users;
  const totalPages = data.totalPages;

  return (
    <div>
      {users.length > 0 ? (
        <div>
          <UsersList users={users} />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              url={url}
              listId="users-list"
            />
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-10 italic">
          Aucun utilisateur
        </div>
      )}
    </div>
  );
}
