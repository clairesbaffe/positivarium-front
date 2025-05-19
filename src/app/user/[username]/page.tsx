"use client";

import { User } from "@/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ArticlesPage from "@/components/articles/ArticlesPage";

export default function UserPage() {
  const params = useParams();
  const username = params.username;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/publisher/${username}`
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [username]);

  return (
    <div className="flex flex-col my-8 md:m-40">
      {user ? (
        <div className="flex flex-col gap-8 mx-8 md:m-0">
          <section className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="font-title text-3xl md:text-5xl">
                {user.username}
              </h1>
              {user.description && <p className="text-lg">{user.description}</p>}
            </div>
            <Button
              title={"Suivre"}
              background={"bg-dark-colored-background"}
              textColor={"text-foreground-inverted"}
              icon={null}
              minWidth
            />
          </section>
          <section>
            <ArticlesPage
              endpoint={`/articles/published/${user.username}`}
              url={`/user/${username}`}
              size="large"
            />
          </section>
        </div>
      ) : (
        <div>
          {!loading && (
            <div className="text-center text-gray-500 text-lg py-10 italic">
              Le publisher n'a pas été trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
}
