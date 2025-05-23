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
