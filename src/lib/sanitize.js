// Basic recursive Mongo-operator stripping to prevent NoSQL injection via JSON bodies
export function sanitize(obj) {
  if (Array.isArray(obj)) return obj.map(sanitize);
  if (obj && typeof obj === "object") {
    const clean = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) continue;
      clean[key] = sanitize(obj[key]);
    }
    return clean;
  }
  return obj;
}
