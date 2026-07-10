import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import { fail } from "./apiResponse";

// Returns decoded user payload or null (server components / route handlers)
export async function getSession() {
  try {
    const store = await cookies();
    const token = store.get("access_token")?.value;
    if (!token) return null;
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

// Guard for API route handlers. Usage: const { user, error } = await requireAuth(["admin"]);
export async function requireAuth(roles = []) {
  const user = await getSession();
  if (!user) return { user: null, error: fail("Unauthorized", 401) };
  if (roles.length && !roles.includes(user.role))
    return { user: null, error: fail("Forbidden", 403) };
  return { user, error: null };
}

export const accessCookie = (token) => ({
  name: "access_token",
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 15,
});

export const refreshCookie = (token) => ({
  name: "refresh_token",
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});
