"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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

  await saveAccessTokenInCookies(data.token);

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

  revalidatePath(`/article/${articleId}`); // to update heart icon in UI
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

  revalidatePath(`/article/${articleId}`); // to update heart icon in UI
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

  revalidatePath(`/article/${articleId}`);
  return { success: true };
}

export async function deleteComment(articleId: number, commentId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
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

  revalidatePath(`/article/${articleId}`);
  return { success: true };
}

export async function reportComment(reason: string, commentId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/comments/${commentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason, isReviewed: false }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  return { success: true };
}

export async function reportArticle(reason: string, articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reports/articles/${articleId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason, isReviewed: false }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  return { success: true };
}

export async function follow(publisherId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/follow/${publisherId}`,
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

  revalidatePath(`/profile/${publisherId}`);
  return { success: true };
}

export async function unfollow(publisherId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/follow/${publisherId}`,
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

  revalidatePath(`/profile/${publisherId}`);
  return { success: true };
}

export async function updateProfileInfo(
  username: string,
  email: string,
  description: string
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, description }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  const data = await res.json();

  await saveAccessTokenInCookies(data.token);

  revalidatePath(`/profile`);
  return { success: true };
}

export async function updatePassword(oldPassword: string, newPassword: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  return { success: true };
}
