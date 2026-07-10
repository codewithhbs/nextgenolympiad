import { NextResponse } from "next/server";

export const ok = (data = {}, message = "Success", status = 200) =>
  NextResponse.json({ success: true, message, data }, { status });

export const fail = (message = "Something went wrong", status = 400, errors = null) =>
  NextResponse.json({ success: false, message, errors }, { status });

export function handleError(err) {
  console.error("[API ERROR]", err?.message || err);
  if (err?.name === "ZodError")
    return fail("Validation failed", 422, err.flatten?.().fieldErrors || err.errors);
  if (err?.code === 11000)
    return fail(`Duplicate value for: ${Object.keys(err.keyValue || {}).join(", ")}`, 409);
  if (err?.name === "ValidationError")
    return fail(err.message, 422);
  return fail(err?.message || "Internal server error", err?.status || 500);
}
