"use client";

import { Article, User } from "@/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ArticlesPage from "@/components/articles/ArticlesPage";

export default function UserPage() {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/publisher/${id}`
      );
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  return (
    <main className="flex flex-col my-8 md:m-24 gap-32">
      {user && (
        <div className="flex flex-col gap-8 mx-8 md:m-0">
          <section className="flex flex-col gap-6">
            <p className="font-title text-2xl md:text-4xl">{user.username}</p>
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
              url={`/user/${id}`}
              size="large"
            />
          </section>
        </div>
      )}
    </main>
  );
}
