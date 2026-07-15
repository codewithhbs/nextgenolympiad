import mongoose from "mongoose";
// Singleton document (key: "global")
const slideSchema = new mongoose.Schema(
  {
    image: String,
    mobileImage:String,
    kicker: String,
    title: String,
    subtitle: String,
    ctaText: String,
    ctaHref: String,
  },
  { _id: false }
);

// Appearance — colors + typography, editable from Admin > Settings > Appearance.
const themeSchema = new mongoose.Schema(
  {
    brand: { type: String, default: "#C8102E" },
    brandHover: { type: String, default: "#A60D26" },
    brandDeep: { type: String, default: "#151922" },
    brandSoft: { type: String, default: "#FDEEF0" },
    gold: { type: String, default: "#D4A537" },
    goldDark: { type: String, default: "#9A6F16" },
    goldSoft: { type: String, default: "#FCF3DF" },
    goldInk: { type: String, default: "#5F4710" },
    accent: { type: String, default: "#2F6FE0" },
    accentSoft: { type: String, default: "#E9F1FF" },
    ink: { type: String, default: "#16181D" },
    muted: { type: String, default: "#454B57" },
    bg: { type: String, default: "#FFFFFF" },
    surface: { type: String, default: "#F7F8FA" },
    line: { type: String, default: "#E6E8EC" },
    crimson: { type: String, default: "#B00020" },
    baseFontSize: { type: Number, default: 17, min: 14, max: 24 },
    navFontSize: { type: Number, default: 16, min: 12, max: 22 },
    logoHeight: { type: Number, default: 56, min: 36, max: 96 },
    bodyWeight: { type: Number, default: 500 },
    headingWeight: { type: Number, default: 800 },
    headingFont: { type: String, default: "Playfair Display" },
    bodyFont: { type: String, default: "Mulish" },
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "global", unique: true },
    theme: { type: themeSchema, default: () => ({}) },
    siteName: { type: String, default: "NextGen Olympiad Foundation" },
    tagline: { type: String, default: "Learn • Compete • Excel" },
    logo: { url: String, publicId: String },
    favicon: { url: String, publicId: String },
    contact: {
      email: { type: String, default: "info@nextgenolympiad.in" },
      phone: { type: String, default: "+91 99112 58259" },
      address: { type: String, default: "G-135, IInd Floor, Vistara House, Sector-22, Rohini, Delhi-110086" },
    },
    social: {
      facebook: String,
      instagram: String,
      youtube: String,
      twitter: String,
      linkedin: String,
    },
    // Hide social links entirely until official pages are ready (admin toggles on).
    socialEnabled: { type: Boolean, default: false },
    // Homepage hero: "content" = banner + text/CTA, "banner" = image-only slides.
    heroMode: { type: String, enum: ["content", "banner"], default: "content" },
    // Homepage hero slider (falls back to built-in slides when empty).
    heroSlides: { type: [slideSchema], default: [] },
    // Bank / UPI details shown to schools on the dashboard payment page
    payment: {
      accountName: { type: String, default: "NextGen Olympiad Foundation" },
      bankName: String,
      accountNo: String,
      ifsc: String,
      branch: String,
      upiId: String,
      note: { type: String, default: "Schools PAN India pay in INR. We do not accept cash. No fee for specially-abled students or children of martyred defence personnel." },
    },
    footerText: { type: String, default: "Learn • Compete • Excel." },
    copyright: { type: String, default: "© 2026 NextGen Olympiad Foundation. All rights reserved." },
    integrations: {
      googleAnalytics: String,
      googleSearchConsole: String,
    },
    seoDefaults: {
      metaTitle: { type: String, default: "NextGen Olympiad Foundation" },
      metaDescription: { type: String, default: "National level Olympiad for Classes I–X and Wonder Kids for Bal Vatika." },
      keywords: { type: [String], default: ["olympiad", "nextgen", "wonder kids", "school olympiad"] },
      ogImage: String,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
