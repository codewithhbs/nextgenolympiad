// Lightweight in-memory limiter (per-instance). For multi-instance prod use Redis/Upstash.
const buckets = new Map();

export function rateLimit(key, { windowMs = 60000, max = 30 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key) || { count: 0, reset: now + windowMs };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + windowMs; }
  entry.count += 1;
  buckets.set(key, entry);
  return { ok: entry.count <= max, remaining: Math.max(0, max - entry.count), reset: entry.reset };
}

export function clientKey(req, suffix = "") {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "local";
  return `${ip}:${suffix}`;
}
