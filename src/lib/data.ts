"use server";

import { fetchData } from "@/lib/actions";

export async function getArticleById(id: number) {
  try {
    return await fetchData(`/articles/${id}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getCommentsByArticleId(
  articleId: number,
  currentPage: number
) {
  try {
    const data = await fetchData(
      `/comments/article/${articleId}?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { comments: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { comments: [], totalPages: null };
  }
}

export async function getPublisher(username: string) {
  try {
    return await fetchData(`/profile/publisher/${username}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getUsers(currentPage: number) {
  try {
    const data = await fetchData(
      `/admin/users/?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { users: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { users: [], totalPages: null };
  }
}

export async function getUser(username: string) {
  try {
    return await fetchData(`/admin/users/${username}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getArticleReports(currentPage: number) {
  try {
    const data = await fetchData(
      `/admin/reports/articles/?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { articles: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { articles: [], totalPages: null };
  }
}

export async function getCommentReports(currentPage: number) {
  try {
    const data = await fetchData(
      `/admin/reports/comments/?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { comments: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { comments: [], totalPages: null };
  }
}

export async function getArticleReportById(id: number) {
  try {
    return await fetchData(`/admin/reports/articles/${id}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getCommentReportById(id: number) {
  try {
    return await fetchData(`/admin/reports/comments/${id}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getUserPublisherResquests(currentPage: number) {
  try {
    const data = await fetchData(
      `/user/publisher_request?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { requests: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { requests: [], totalPages: null };
  }
}

export async function getActivePublisherResquests(currentPage: number) {
  try {
    const data = await fetchData(
      `/admin/publisher_requests/active?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { requests: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { requests: [], totalPages: null };
  }
}

export async function getArticles(endpoint: string) {
  try {
    const data = await fetchData(`${endpoint}`, "GET");
    return { articles: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { articles: [], totalPages: null };
  }
}

export async function getFollowedPublishers(currentPage: number) {
  try {
    const data = await fetchData(
      `/user/follow?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { publishers: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { publishers: [], totalPages: null };
  }
}

export async function getMoods() {
  try {
    return await fetchData(`/journal/moods`, "GET");
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    return await fetchData(`/articles/categories/all`, "GET");
  } catch (error) {
    return [];
  }
}

export async function getEntries(currentPage: number) {
  try {
    const data = await fetchData(
      `/journal/?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { entries: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { entries: [], totalPages: null };
  }
}

export async function getTodaysEntry() {
  try {
    return await fetchData("/journal/today", "GET");
  } catch (error) {
    // if body is null, error is thrown by fetchData on json parse
    return null;
  }
}

export async function getDrafts(currentPage: number) {
  try {
    const data = await fetchData(
      `/publisher/articles/drafts?page=${currentPage - 1}&size=10`,
      "GET"
    );
    return { drafts: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { drafts: [], totalPages: null };
  }
}

export async function getDraftById(id: number) {
  try {
    return await fetchData(`/publisher/articles/drafts/${id}`, "GET");
  } catch (error) {
    return null;
  }
}

export async function getUserGlobalPreferences(currentPage: number) {
  try {
    const data = await fetchData(
      `/global_preferences/?page=${currentPage - 1}&size=20`,
      "GET"
    );
    return { preferences: data.content, totalPages: data.totalPages };
  } catch (error) {
    return { preferences: [], totalPages: null };
  }
}
