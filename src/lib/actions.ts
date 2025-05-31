"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { Category, Mood } from "./definitions";

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

// BAN not allowed
export async function like(articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function createComment(content: string, articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function deleteComment(articleId: number, commentId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function reportComment(reason: string, commentId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function reportArticle(reason: string, articleId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function follow(publisherId: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

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

// BAN not allowed
export async function ban(username: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/ban/${username}`,
    {
      method: "PATCH",
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

  revalidatePath(`/admin/users/${username}`);
  return { success: true };
}

// BAN not allowed
export async function unban(username: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/unban/${username}`,
    {
      method: "PATCH",
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

  revalidatePath(`/admin/users/${username}`);
  return { success: true };
}

// BAN not allowed
export async function grantAdmin(username: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/admin/${username}`,
    {
      method: "PUT",
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

  revalidatePath(`/admin/users/${username}`);
  return { success: true };
}

// BAN not allowed
export async function markReportAsRead(
  id: number,
  type: "article" | "comment"
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${type}s/${id}`,
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

  revalidatePath(`/admin/reports/${type}s/${id}`);
  return { success: true };
}

// BAN not allowed
export async function deleteArticleAdmin(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/articles/${id}`,
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

  return { success: true };
}

// BAN not allowed
export async function deleteCommentAdmin(id: number, articleId?: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/comments/${id}`,
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

  if (articleId) revalidatePath(`/article/${articleId}`);
  return { success: true };
}

// BAN not allowed
export async function sendPublisherRequest(motivation: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/publisher_request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ motivation }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath(`/user/publisher_requests`);
  return { success: true };
}

// BAN not allowed
export async function updatePublisherRequestStatusAdmin(
  id: number,
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/publisher_requests/${id}?status=${status}`,
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

  revalidatePath(`/admin/publisher_requests`);
  return { success: true };
}

export async function cancelPublisherRequestUser(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be an user" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/publisher_request/cancel/${id}`,
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

  revalidatePath(`/user/publisher_requests`);
  return { success: true };
}

// BAN not allowed
export async function createEntry(
  description: string,
  moods: Mood[],
  categories: Category[]
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be an user" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const moodIds: number[] = moods.map((mood) => mood.id);
  const categoryIds: number[] = categories.map((cat) => cat.id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journal/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, moodIds, categoryIds }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath(`/journal`);
  return { success: true };
}

export async function updateEntry(
  id: number,
  description: string,
  moods: Mood[],
  categories: Category[]
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be an user" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const moodIds: number[] = moods.map((mood) => mood.id);
  const categoryIds: number[] = categories.map((cat) => cat.id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journal/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, moodIds, categoryIds }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath(`/journal`);
  return { success: true };
}

export async function deleteEntry(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be an user" };
  if (user.roles.includes("ROLE_BAN"))
    return { success: false, error: "User must not be banned" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journal/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    return { success: false, error };
  }

  revalidatePath(`/journal`);
  return { success: true };
}

export async function uploadImage(formData: FormData) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cloudinary/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    if (res.status === 401 || res.status === 403) {
      throw new Error("NOT_CONNECTED");
    } else if (res.status === 413) {
      throw new Error("PAYLOAD_TOO_LARGE");
    } else {
      throw new Error(errText || `Erreur HTTP ${res.status}`);
    }
  }

  return await res.text();
}

export async function createDraft(
  title: string,
  description: string,
  content: string,
  mainImage: string,
  categoryId: number
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    throw new Error(`Request failed : ${error}`);
  }

  const data = await res.json();
  return { success: true, id: data.id };
}

export async function updateDraft(
  id: number,
  title: string,
  description: string,
  content: string,
  mainImage: string,
  categoryId: number
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/drafts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    throw new Error(`Request failed : ${error}`);
  }

  return { success: true, id: null };
}

export async function deleteDraft(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/drafts/${id}`,
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
    throw new Error(`Request failed : ${error}`);
  }

  return { success: true };
}

// BAN not allowed
export async function publishDraft(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");
  if (user.roles.includes("ROLE_BAN"))
    throw new Error("User must not be banned");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/publish/${id}`,
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
    throw new Error(`Request failed : ${error}`);
  }

  return { success: true };
}

// BAN not allowed
export async function updateArticle(
  id: number,
  title: string,
  description: string,
  content: string,
  mainImage: string,
  categoryId: number
) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");
  if (user.roles.includes("ROLE_BAN"))
    throw new Error("User must not be banned");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error(errorData?.error || "Erreur inconnue");

    const error = errorData?.error || "Erreur inconnue";
    throw new Error(`Request failed : ${error}`);
  }

  return { success: true, id: null };
}

// BAN not allowed
export async function deleteArticlePublisher(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) throw new Error("NOT_CONNECTED");

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    throw new Error("User must be an publisher");
    if (user.roles.includes("ROLE_BAN"))
    throw new Error("User must not be banned");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/${id}`,
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
    throw new Error(`Request failed : ${error}`);
  }

  return { success: true };
}