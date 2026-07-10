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

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "global", unique: true },
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
