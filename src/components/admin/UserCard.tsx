import { UserDetails } from "@/lib/definitions";
import Link from "next/link";

const roleData = (role: string) => {
  switch (role) {
    case "ROLE_ADMIN":
      return { name: "Admin", bg: "bg-gray-400/30", color: "text-gray-800" };
    case "ROLE_PUBLISHER":
      return {
        name: "Rédacteur",
        bg: "bg-gray-400/30",
        color: "text-gray-800",
      };
    case "ROLE_USER":
      return {
        name: "Utilisateur",
        bg: "bg-gray-400/30",
        color: "text-gray-800",
      };
    case "ROLE_BAN":
      return { name: "Ban", bg: "bg-red-400/30", color: "text-red-800" };
    default:
      return { name: "", bg: "", color: "" };
  }
};

export default function UserCard({ user }: { user: UserDetails }) {
  return (
    <Link
      className="border border-foreground-muted rounded-md p-6 grid gap-2"
      href={`/admin/users/${user.username}`}
    >
      <div className="flex gap-4">
        <p className="font-bold text-lg">{user.username}</p>
        <div className="flex gap-2">
          {user.roles.map((role) => {
            const { name, bg, color } = roleData(role);
            return (
              <p
                key={role}
                className={`${bg} ${color} text-sm py-1 px-3 rounded-full w-min`}
              >
                {name}
              </p>
            );
          })}
        </div>
      </div>
      <p>{user.description}</p>
    </Link>
  );
}
