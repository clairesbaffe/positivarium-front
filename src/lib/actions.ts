"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { Category, Mood } from "@/lib/definitions";

export async function fetchData(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  body?: string
) {
  try {
    const token = (await cookies()).get("access_token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    if (res.status === 204 || res.headers.get("Content-Length") === "0") {
      return null;
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }

    return await res.text();
  } catch (error) {
    throw new Error(`Fetch error: ${String(error)}`);
  }
}

export async function like(articleId: number) {
  try {
    await fetchData(`/likes/article/${articleId}`, "POST");

    revalidatePath(`/article/${articleId}`); // to update heart icon in UI
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function unlike(articleId: number) {
  try {
    await fetchData(`/likes/article/${articleId}`, "DELETE");

    revalidatePath(`/article/${articleId}`); // to update heart icon in UI
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function createComment(content: string, articleId: number) {
  try {
    await fetchData(
      `/comments/${articleId}`,
      "POST",
      JSON.stringify({ content })
    );

    revalidatePath(`/article/${articleId}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteComment(articleId: number, commentId: number) {
  try {
    await fetchData(`/comments/${commentId}`, "DELETE");

    revalidatePath(`/article/${articleId}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function reportComment(reason: string, commentId: number) {
  try {
    await fetchData(
      `/reports/comments/${commentId}`,
      "POST",
      JSON.stringify({ reason, isReviewed: false })
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function reportArticle(reason: string, articleId: number) {
  try {
    await fetchData(
      `/reports/articles/${articleId}`,
      "POST",
      JSON.stringify({ reason, isReviewed: false })
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function follow(publisherId: number) {
  try {
    await fetchData(`/user/follow/${publisherId}`, "POST");

    revalidatePath(`/profile/${publisherId}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function unfollow(publisherId: number) {
  try {
    await fetchData(`/user/follow/${publisherId}`, "DELETE");

    revalidatePath(`/profile/${publisherId}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function ban(username: string) {
  try {
    await fetchData(`/admin/users/ban/${username}`, "PATCH");

    revalidatePath(`/admin/users/${username}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function unban(username: string) {
  try {
    await fetchData(`/admin/users/unban/${username}`, "PATCH");

    revalidatePath(`/admin/users/${username}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function grantAdmin(username: string) {
  try {
    await fetchData(`/admin/users/admin/${username}`, "PUT");

    revalidatePath(`/admin/users/${username}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function markReportAsRead(
  id: number,
  type: "article" | "comment"
) {
  try {
    await fetchData(`/admin/reports/${type}s/${id}`, "POST");

    revalidatePath(`/admin/reports/${type}s/${id}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteArticleAdmin(id: number) {
  try {
    await fetchData(`/admin/articles/${id}`, "DELETE");
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteCommentAdmin(id: number, articleId?: number) {
  try {
    await fetchData(`/admin/comments/${id}`, "DELETE");

    if (articleId) revalidatePath(`/article/${articleId}`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function sendPublisherRequest(motivation: string) {
  try {
    await fetchData(
      `/user/publisher_request`,
      "POST",
      JSON.stringify({ motivation })
    );

    revalidatePath(`/user/publisher_requests`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updatePublisherRequestStatusAdmin(
  id: number,
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED"
) {
  try {
    await fetchData(`/admin/publisher_requests/${id}?status=${status}`, "POST");

    revalidatePath(`/admin/publisher_requests`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function cancelPublisherRequestUser(id: number) {
  try {
    await fetchData(`/user/publisher_request/cancel/${id}`, "POST");

    revalidatePath(`/user/publisher_requests`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function createEntry(
  description: string,
  moods: Mood[],
  categories: Category[]
) {
  try {
    const moodIds: number[] = moods.map((mood) => mood.id);
    const categoryIds: number[] = categories.map((cat) => cat.id);

    await fetchData(
      `/journal/`,
      "POST",
      JSON.stringify({ description, moodIds, categoryIds })
    );

    revalidatePath(`/journal`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updateEntry(
  id: number,
  description: string,
  moods: Mood[],
  categories: Category[]
) {
  try {
    const moodIds: number[] = moods.map((mood) => mood.id);
    const categoryIds: number[] = categories.map((cat) => cat.id);

    await fetchData(
      `/journal/${id}`,
      "PATCH",
      JSON.stringify({ description, moodIds, categoryIds })
    );

    revalidatePath(`/journal`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteEntry(id: number) {
  try {
    await fetchData(`/journal/${id}`, "DELETE");

    revalidatePath(`/journal`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function uploadImage(formData: FormData) {
  const token = (await cookies()).get("access_token")?.value;

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
  try {
    const data = await fetchData(
      `/publisher/articles/`,
      "POST",
      JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      })
    );
    return { id: data.id };
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updateDraft(
  id: number,
  title: string,
  description: string,
  content: string,
  mainImage: string,
  categoryId: number
) {
  try {
    await fetchData(
      `/publisher/articles/drafts/${id}`,
      "PUT",
      JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      })
    );
    return { id: null };
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteDraft(id: number) {
  try {
    await fetchData(`/publisher/articles/drafts/${id}`, "DELETE");
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function publishDraft(id: number) {
  try {
    await fetchData(`/publisher/articles/publish/${id}`, "POST");
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function updateArticle(
  id: number,
  title: string,
  description: string,
  content: string,
  mainImage: string,
  categoryId: number
) {
  try {
    await fetchData(
      `/publisher/articles/${id}`,
      "PUT",
      JSON.stringify({
        title,
        description,
        content,
        mainImage,
        category: { id: categoryId },
      })
    );
    return { success: true, id: null };
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteArticlePublisher(id: number) {
  try {
    await fetchData(`/publisher/articles/${id}`, "DELETE");
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function addOrUpdateGlobalPreference(
  mood: Mood,
  categories: Category[],
  id?: number
) {
  try {
    const moodId: number = mood.id;
    const categoryIds: number[] = categories.map((cat) => cat.id);

    await fetchData(
      `/global_preferences/${id ? id : ""}`,
      "POST",
      JSON.stringify({ moodId, categoryIds })
    );

    revalidatePath(`/profile/news_preferences`);
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function deleteGlobalPreference(id: number) {
  try {
    await fetchData(`/global_preferences/${id}`, "DELETE");

    revalidatePath(`/profile/news_preferences`);
  } catch (error) {
    throw new Error(String(error));
  }
}
