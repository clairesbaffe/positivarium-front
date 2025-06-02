import { User } from "@/lib/definitions";
import FollowedPublisherCard from "./FollowedPublisherCard";

export default function FollowedPublishersList({
  publishers,
}: {
  publishers: User[];
}) {
  return (
    <ul className="grid gap-6" id="publishers-list">
      {publishers.map((publisher) => (
        <FollowedPublisherCard key={publisher.id} publisher={publisher} />
      ))}
    </ul>
  );
}
