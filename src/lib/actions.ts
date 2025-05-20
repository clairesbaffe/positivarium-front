"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function login(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  const data = await res.json();

  (await cookies()).set({
    name: "access_token",
    value: data.token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h
  });

  return { success: true };
}

export async function like(articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/likes/article/${articleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath("/article/*"); // to update heart icon in UI
  return { success: true };
}

export async function unlike(articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/likes/article/${articleId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath("/article/*"); // to update heart icon in UI
  return { success: true };
}

export async function createComment(content: string, articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${articleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath("/article/*");
  return { success: true };
}
