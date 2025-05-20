"use server";

import { cookies } from "next/headers";

export async function getArticleById(id: number) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function getCommentsByArticleId(articleId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/article/${articleId}`
  );
  const data = await res.json();
  return data.content;
}

export async function getPublisher(username: string) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/publisher/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
}
