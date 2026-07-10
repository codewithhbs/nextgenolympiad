import mongoose from "mongoose";

// Flexible CMS page: `sections` is an ordered array of typed blocks (mixed schema)
const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["standard", "home", "policy", "custom"], default: "standard" },
    content: { type: String, default: "" },
    sections: { type: mongoose.Schema.Types.Mixed, default: [] },
    isPublished: { type: Boolean, default: true },
    showInNav: { type: Boolean, default: false },
    navOrder: { type: Number, default: 0 },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      ogImage: String,
      canonical: String,
      noIndex: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
