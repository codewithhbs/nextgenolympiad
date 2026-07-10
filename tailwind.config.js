/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  safelist: [
    "bg-navy", "text-navy", "bg-gold", "text-gold",
    "bg-crimson", "text-crimson", "bg-gold-soft", "text-gold-ink",
    "bg-navy-soft", "text-navy-soft",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Mulish", "system-ui", "sans-serif"],
      },
      colors: {
        // Heraldic brand — navy + gold + crimson on ivory
        navy: "#0B2C63",          // primary (crest shield)
        "navy-deep": "#071E45",
        "navy-soft": "#3A5385",
        gold: "#C79A3B",          // heraldic gold accent
        "gold-dark": "#A87C24",
        "gold-soft": "#F4E9CC",
        "gold-ink": "#6E5416",
        crimson: "#8E1B2E",       // banner maroon (use sparingly)
        "crimson-soft": "#F6DEE2",
        ink: "#12233F",           // body text
        slate: "#4A5B78",         // muted text
        ivory: "#FBF8F1",         // page background
        parchment: "#F4EEE0",
        mist: "#EEF2F8",
        line: "#E7E1D3",
        // legacy aliases kept so any un-migrated class still resolves
        "ink-soft": "#4A5B78",
        saffron: "#C79A3B",
        "saffron-soft": "#F4E9CC",
        leaf: "#0B2C63",
        grape: "#8E1B2E",
        "grape-soft": "#F6DEE2",
        cherry: "#8E1B2E",
        cream: "#F4EEE0",
        sky: "#EEF2F8",
        cloud: "#FBF8F1",
      },
      borderRadius: { xl: "0.9rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        soft: "0 12px 40px rgba(11,44,99,0.10)",
        card: "0 6px 24px rgba(11,44,99,0.07)",
        gold: "0 8px 30px rgba(199,154,59,0.25)",
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
