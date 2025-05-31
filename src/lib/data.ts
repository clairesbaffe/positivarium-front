"use server";

import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

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

export async function getUsers(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { users: data.content, totalPages: data.totalPages };
}

export async function getUser(username: string) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${username}`,
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

export async function getArticleReports(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/articles/?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { articles: data.content, totalPages: data.totalPages };
}

export async function getCommentReports(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/comments/?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { comments: data.content, totalPages: data.totalPages };
}

export async function getArticleReportById(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/articles/${id}`,
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

export async function getCommentReportById(id: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/comments/${id}`,
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

export async function getUserPublisherResquests(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/publisher_request?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { requests: data.content, totalPages: data.totalPages };
}

export async function getActivePublisherResquests(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_ADMIN"))
    return { success: false, error: "User must be an admin" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/publisher_requests/active?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { requests: data.content, totalPages: data.totalPages };
}

export async function getArticles(endpoint: string) {
  const token = (await cookies()).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return { articles: data.content, totalPages: data.totalPages };
}

export async function getFollowedPublishers(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/follow?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { publishers: data.content, totalPages: data.totalPages };
}

export async function getMoods() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journal/moods`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function getCategories() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/categories/all`,
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

export async function getEntries(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/journal/?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { entries: data.content, totalPages: data.totalPages };
}

export async function getTodaysEntry() {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_USER"))
    return { success: false, error: "User must be a user" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journal/today`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const raw = await res.text();
  if (!raw) return null;

  return JSON.parse(raw);
}

export async function getDrafts(currentPage: number) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return { success: false, error: "User is not connected" };

  const user = await getCurrentUser();
  if (!user.roles.includes("ROLE_PUBLISHER"))
    return { success: false, error: "User must be a publisher" };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/publisher/articles/drafts?page=${
      currentPage - 1
    }&size=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return { drafts: data.content, totalPages: data.totalPages };
}
