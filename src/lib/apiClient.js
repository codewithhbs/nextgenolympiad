"use client";
// Wrapper that auto-refreshes access token once on 401.
async function request(url, options = {}, retry = true) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  if (res.status === 401 && retry) {
    const r = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
    if (r.ok) return request(url, options, false);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || "Request failed"), { status: res.status, data });
  return data;
}
export const api = {
  get: (u) => request(u),
  post: (u, body) => request(u, { method: "POST", body: JSON.stringify(body) }),
  patch: (u, body) => request(u, { method: "PATCH", body: JSON.stringify(body) }),
  del: (u, body) => request(u, { method: "DELETE", body: body ? JSON.stringify(body) : undefined }),
  upload: async (file, folder = "nextgen") => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "include" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },
};
