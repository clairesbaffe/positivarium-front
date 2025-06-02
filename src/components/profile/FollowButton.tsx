"use client";

import { useUser } from "@/context/UserContext";
import { User } from "@/lib/definitions";
import { follow, unfollow } from "@/lib/actions";

import { CircleUserRound } from "lucide-react";
import Button from "@/components/Button";
import { toast } from "react-toastify";

export default function FollowButton({ publisher }: { publisher: User }) {
  const user = useUser();

  const handleClick = async () => {
    try {
      publisher.isFollowed
        ? await unfollow(publisher.id)
        : await follow(publisher.id);
    } catch (error) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {user?.roles.includes("ROLE_USER") && (
            <Button
              title={publisher.isFollowed ? "Ne plus suivre" : "Suivre"}
              background={"bg-colored-background"}
              textColor={"text-foreground"}
              icon={null}
              minWidth
              onClick={handleClick}
            />
          )}
        </div>
      ) : (
        <div>
          <Button
            title={"Se connecter pour suivre"}
            background={"bg-colored-background"}
            textColor={"text-foreground"}
            icon={<CircleUserRound size={18} />}
            href={`/login?next=/user/${publisher.username}`}
          />
        </div>
      )}
    </div>
  );
}
