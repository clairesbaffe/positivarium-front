import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";

const NOT_FOUND_PATH = "/__not-found-trigger__";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;
  const isAuthenticated = token != null;

  if (
    (pathname.startsWith("/login") || pathname.startsWith("/signup")) &&
    isAuthenticated
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/profile") && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/profile/news_preferences")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    const user = await getCurrentUser();
    const hasAccess = user?.roles?.includes("ROLE_USER");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      // triggers Next.js 404 default page since /__not-found-trigger__ does not exist
      url.pathname = NOT_FOUND_PATH;
      return NextResponse.rewrite(url);
    }
  }

  if (pathname.startsWith("/admin")) {
    const user = isAuthenticated ? await getCurrentUser() : null;
    const hasAccess = user?.roles?.includes("ROLE_ADMIN");

    if (!isAuthenticated || !hasAccess) {
      const url = request.nextUrl.clone();
      // also redirects to 404 for login because this routes are sensible
      // no information on its existence must be leaked
      // triggers Next.js 404 default page since /__not-found-trigger__ does not exist
      url.pathname = NOT_FOUND_PATH;
      return NextResponse.rewrite(url);
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    const user = await getCurrentUser();
    const hasAccess = user?.roles?.includes("ROLE_USER");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      // triggers Next.js 404 default page since /__not-found-trigger__ does not exist
      url.pathname = NOT_FOUND_PATH;
      return NextResponse.rewrite(url);
    }
  }

  if (
    (pathname.startsWith("/article/liked") ||
      pathname.startsWith("/article/commented") ||
      pathname.startsWith("/article/followed")) &&
    !isAuthenticated
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/journal") ||
    pathname.startsWith("/publisher_requests")
  ) {
    const user = await getCurrentUser();
    const hasAccess = !user || user?.roles?.includes("ROLE_USER");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      // triggers Next.js 404 default page since /__not-found-trigger__ does not exist
      url.pathname = NOT_FOUND_PATH;
      return NextResponse.rewrite(url);
    }
  }

  if (pathname.startsWith("/publisher")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    const user = await getCurrentUser();
    const hasAccess = user?.roles?.includes("ROLE_PUBLISHER");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      // triggers Next.js 404 default page since /__not-found-trigger__ does not exist
      url.pathname = NOT_FOUND_PATH;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile",
    "/profile/news_preferences",
    "/admin/:path*",
    "/user/:path*",
    "/article/liked",
    "/article/commented",
    "/article/followed",
    "/journal",
    "/publisher/:path*",
  ],
};
