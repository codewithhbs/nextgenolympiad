import { NextResponse } from "next/server";
import { verifyEdge } from "@/lib/edgeAuth";

const ADMIN_ROLES = ["admin", "super_admin"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;
  const user = token ? await verifyEdge(token) : null;

  const isAdmin = pathname.startsWith("/admin");
  const isSchool = pathname.startsWith("/school");
  const isAuthPage = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"].some((p) =>
    pathname.startsWith(p)
  );

  // logged-in users skip auth pages
  if (isAuthPage && user) {
    const url = req.nextUrl.clone();
    url.pathname = ADMIN_ROLES.includes(user.role) ? "/admin/dashboard" : "/school/dashboard";
    return NextResponse.redirect(url);
  }

  if (isAdmin) {
    if (!user) return redirectLogin(req);
    if (!ADMIN_ROLES.includes(user.role)) return forbidden(req);
  }

  if (isSchool) {
    if (!user) return redirectLogin(req);
    if (user.role !== "school") return forbidden(req);
  }

  return NextResponse.next();
}

function redirectLogin(req) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}
function forbidden(req) {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/school/:path*", "/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"],
};
