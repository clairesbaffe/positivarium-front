import { UserDetails } from "@/lib/definitions";
import UserCard from "./UserCard";

export default function UsersList({ users }: { users: UserDetails[] }) {
  return (
    <ul className="grid gap-6" id="users-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
