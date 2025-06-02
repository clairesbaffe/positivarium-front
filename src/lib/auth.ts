"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fetchData } from "@/lib/actions";

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) return null;

    const res = await fetch(`${process.env.API_URL}/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function saveAccessTokenInCookies(token: string) {
  (await cookies()).set({
    name: "access_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h
  });
}

export async function login(username: string, password: string) {
  try {
    const data = await fetchData(
      `/login`,
      "POST",
      JSON.stringify({ username, password })
    );
    await saveAccessTokenInCookies(data.token);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    await fetchData(
      `/register`,
      "POST",
      JSON.stringify({ username, email, password })
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function logout() {
  try {
    const isConnected = (await cookies()).has("access_token");
    if (isConnected) (await cookies()).delete("access_token");
    else console.error("User is not connected");
    redirect("/login");
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updateProfileInfo(
  username: string,
  email: string,
  description: string
) {
  try {
    const data = await fetchData(
      `/profile/`,
      "PATCH",
      JSON.stringify({ username, email, description })
    );

    await saveAccessTokenInCookies(data.token);

    revalidatePath(`/profile`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updatePassword(oldPassword: string, newPassword: string) {
  try {
    await fetchData(
      `/profile/password`,
      "PATCH",
      JSON.stringify({ oldPassword, newPassword })
    );
  } catch (error) {
    throw new Error(String(error));
  }
}
