"use server";

import { cookies } from "next/headers";

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
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
