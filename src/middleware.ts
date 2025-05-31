import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";

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

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    const user = await getCurrentUser();
    const hasAccess = user?.roles?.includes("ROLE_ADMIN");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
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
      url.pathname = "/";
      return NextResponse.redirect(url);
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

  if (pathname.startsWith("/journal")) {
    const user = await getCurrentUser();
    const hasAccess = !user || user?.roles?.includes("ROLE_USER");
    if (!hasAccess) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
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
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile",
    "/admin/:path*",
    "/user/:path*",
    "/article/liked",
    "/article/commented",
    "/article/followed",
    "/journal",
    "/publisher/:path*",
  ],
};
