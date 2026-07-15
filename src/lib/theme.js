// Central theme source. Admin (Settings > Appearance) overrides these.
// Colors flow to Tailwind via CSS vars (rgb triplets) + raw hex vars for inline SVG/styles.

export const DEFAULT_THEME = {
  brand: "#C8102E",        // China red — primary (accents, buttons, headings)
  brandHover: "#A60D26",   // darker red — button hover only
  brandDeep: "#151922",    // dark charcoal panel — footer / dark sections (NOT red)
  brandSoft: "#FDEEF0",    // faint red tint (small pills only)
  gold: "#D4A537",         // golden accent
  goldDark: "#9A6F16",     // gold text on white (AA contrast)
  goldSoft: "#FCF3DF",
  goldInk: "#5F4710",
  accent: "#2F6FE0",       // light blue (never dark navy)
  accentSoft: "#E9F1FF",
  ink: "#16181D",          // body text — high contrast
  muted: "#454B57",        // muted text — still readable
  bg: "#FFFFFF",           // page background (white)
  surface: "#F7F8FA",      // neutral section background (never red)
  line: "#E6E8EC",         // borders
  crimson: "#B00020",      // danger / error
  baseFontSize: 17,        // px — scales every rem in the site
  navFontSize: 16,         // px — header menu text, controlled separately
  logoHeight: 56,          // px — header logo height
  bodyWeight: 500,         // bolder body text
  headingWeight: 800,
  headingFont: "Playfair Display",
  bodyFont: "Mulish",
};

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function hexToTriplet(hex, fallback = "0 0 0") {
  if (typeof hex !== "string" || !HEX.test(hex.trim())) return fallback;
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

const KEYS = [
  ["brand", "brand"], ["brandHover", "brand-hover"], ["brandDeep", "brand-deep"], ["brandSoft", "brand-soft"],
  ["gold", "gold"], ["goldDark", "gold-dark"], ["goldSoft", "gold-soft"], ["goldInk", "gold-ink"],
  ["accent", "accent"], ["accentSoft", "accent-soft"],
  ["ink", "ink"], ["muted", "muted"], ["bg", "bg"], ["surface", "surface"],
  ["line", "line"], ["crimson", "crimson"],
];

export function mergeTheme(theme) {
  const t = { ...DEFAULT_THEME, ...(theme || {}) };
  for (const [k] of KEYS) if (!HEX.test(String(t[k] || ""))) t[k] = DEFAULT_THEME[k];
  const clamp = (v, lo, hi, d) => (Number.isFinite(Number(v)) ? Math.min(hi, Math.max(lo, Number(v))) : d);
  t.baseFontSize = clamp(t.baseFontSize, 14, 24, DEFAULT_THEME.baseFontSize);
  t.navFontSize = clamp(t.navFontSize, 12, 22, DEFAULT_THEME.navFontSize);
  t.logoHeight = clamp(t.logoHeight, 36, 96, DEFAULT_THEME.logoHeight);
  return t;
}

export function buildThemeCss(theme) {
  const t = mergeTheme(theme);
  const hex = KEYS.map(([k, v]) => `--${v}:${t[k]};`).join("");
  const rgb = KEYS.map(([k, v]) => `--c-${v}:${hexToTriplet(t[k], hexToTriplet(DEFAULT_THEME[k]))};`).join("");
  return `:root{${hex}${rgb}--fs-base:${t.baseFontSize}px;--fs-nav:${t.navFontSize}px;--logo-h:${t.logoHeight}px;--fw-body:${t.bodyWeight || 500};--fw-heading:${t.headingWeight || 800};--font-display:"${t.headingFont || "Playfair Display"}",Georgia,serif;--font-sans:"${t.bodyFont || "Mulish"}",system-ui,sans-serif;}`;
}

export function fontHref(theme) {
  const t = mergeTheme(theme);
  const fam = (f) => encodeURIComponent(f).replace(/%20/g, "+");
  return `https://fonts.googleapis.com/css2?family=${fam(t.bodyFont)}:wght@400;500;600;700;800&family=${fam(t.headingFont)}:wght@600;700;800;900&display=swap`;
}
