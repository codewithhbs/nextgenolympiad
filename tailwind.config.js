/** @type {import('tailwindcss').Config} */
const c = (v) => ({ opacityValue }) =>
  opacityValue === undefined ? `rgb(var(--c-${v}))` : `rgb(var(--c-${v}) / ${opacityValue})`;

export default {
  content: ["./src/**/*.{js,jsx}"],
  safelist: [
    "bg-navy", "text-navy", "bg-gold", "text-gold",
    "bg-crimson", "text-crimson", "bg-gold-soft", "text-gold-ink",
    "bg-navy-soft", "text-navy-soft", "bg-brand", "text-brand",
    "bg-accent", "text-accent", "bg-accent-soft",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        // China red + white + gold, with a light (never dark) blue accent.
        brand: c("brand"),
        "brand-hover": c("brand-hover"),
        "brand-deep": c("brand-deep"),
        "brand-soft": c("brand-soft"),
        gold: c("gold"),
        "gold-dark": c("gold-dark"),
        "gold-soft": c("gold-soft"),
        "gold-ink": c("gold-ink"),
        accent: c("accent"),
        "accent-soft": c("accent-soft"),
        ink: c("ink"),
        slate: c("muted"),
        muted: c("muted"),
        ivory: c("bg"),
        white: c("bg"),
        surface: c("surface"),
        mist: c("surface"),
        parchment: c("surface"),
        line: c("line"),
        crimson: c("crimson"),
        "crimson-soft": c("brand-soft"),

        // legacy aliases → remapped so old classes keep working.
        // Headings/chips go dark charcoal (modern), red is reserved for CTAs + accents.
        navy: c("ink"),
        "navy-deep": c("brand-deep"),
        "navy-soft": c("muted"),
        "ink-soft": c("muted"),
        saffron: c("gold"),
        "saffron-soft": c("gold-soft"),
        leaf: c("brand"),
        grape: c("ink"),
        "grape-soft": c("brand-soft"),
        cherry: c("crimson"),
        cream: c("surface"),
        sky: c("surface"),
        cloud: c("bg"),
      },
      borderRadius: { xl: "0.9rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        soft: "0 12px 40px rgba(140,10,32,0.12)",
        card: "0 6px 24px rgba(140,10,32,0.08)",
        gold: "0 8px 30px rgba(212,165,55,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "slide-fade": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up .6s ease-out both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "slide-fade": "slide-fade .7s ease-out both",
      },
    },
  },
  plugins: [],
};
