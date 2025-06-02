import { User } from "@/lib/definitions";
import Link from "next/link";

export default function FollowedPublisherCard({
  publisher,
}: {
  publisher: User;
}) {
  return (
    <Link
      className="border border-foreground-muted rounded-md p-6 grid gap-2"
      href={`/profile/${publisher.username}`}
    >
      <div className="flex gap-4">
        <p className="font-bold text-lg">{publisher.username}</p>
      </div>
      <p>{publisher.description}</p>
    </Link>
  );
}
