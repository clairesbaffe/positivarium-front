"use server";

import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";

import { fetchData } from "@/lib/actions";

export async function getArticleById(id: number) {
  return await fetchData(`/articles/${id}`, "GET");
}

export async function getCommentsByArticleId(articleId: number) {
  const data = await fetchData(`/comments/article/${articleId}`, "GET");
  return data.content;
}

export async function getPublisher(username: string) {
  return await fetchData(`/profile/publisher/${username}`, "GET");
}

export async function getUsers(currentPage: number) {
  const data = await fetchData(
    `/admin/users/?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { users: data.content, totalPages: data.totalPages };
}

export async function getUser(username: string) {
  return await fetchData(`/admin/users/${username}`, "GET");
}

export async function getArticleReports(currentPage: number) {
  const data = await fetchData(
    `/admin/reports/articles/?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { articles: data.content, totalPages: data.totalPages };
}

export async function getCommentReports(currentPage: number) {
  const data = await fetchData(
    `/admin/reports/comments/?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { comments: data.content, totalPages: data.totalPages };
}

export async function getArticleReportById(id: number) {
  return await fetchData(`/admin/reports/articles/${id}`, "GET");
}

export async function getCommentReportById(id: number) {
  return await fetchData(`/admin/reports/comments/${id}`, "GET");
}

export async function getUserPublisherResquests(currentPage: number) {
  const data = await fetchData(
    `/user/publisher_request?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { requests: data.content, totalPages: data.totalPages };
}

export async function getActivePublisherResquests(currentPage: number) {
  const data = await fetchData(
    `/admin/publisher_requests/active?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { requests: data.content, totalPages: data.totalPages };
}

export async function getArticles(endpoint: string) {
  const data = await fetchData(`${endpoint}`, "GET");
  return { articles: data.content, totalPages: data.totalPages };
}

export async function getFollowedPublishers(currentPage: number) {
  const data = await fetchData(
    `/user/follow?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { publishers: data.content, totalPages: data.totalPages };
}

export async function getMoods() {
  return await fetchData(`/journal/moods`, "GET");
}

export async function getCategories() {
  return await fetchData(`/articles/categories/all`, "GET");
}

export async function getEntries(currentPage: number) {
  const data = await fetchData(
    `/journal/?page=${currentPage - 1}&size=10`,
    "GET"
  );
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
  const data = await fetchData(
    `/publisher/articles/drafts?page=${currentPage - 1}&size=10`,
    "GET"
  );
  return { drafts: data.content, totalPages: data.totalPages };
}

export async function getDraftById(id: number) {
  return await fetchData(`/publisher/articles/drafts/${id}`, "GET");
}

export async function getUserGlobalPreferences(currentPage: number) {
  const data = await fetchData(
    `/global_preferences/?page=${currentPage - 1}&size=20`,
    "GET"
  );
  return { preferences: data.content, totalPages: data.totalPages };
}
