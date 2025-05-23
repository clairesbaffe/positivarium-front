"use server";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  return await res.json();
}

export async function logout() {
  const isConnected = (await cookies()).has("access_token");
  if (isConnected) (await cookies()).delete("access_token");
  else console.error("User is not connected");
  redirect("/login");
}
