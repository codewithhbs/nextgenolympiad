import { cookies } from "next/headers";
import { ok } from "@/lib/apiResponse";
export async function POST() {
  const store = await cookies();
  store.delete("access_token");
  store.delete("refresh_token");
  return ok({}, "Logged out");
}
