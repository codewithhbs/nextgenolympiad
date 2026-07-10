import mongoose from "mongoose";
const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    image: { url: { type: String, required: true }, publicId: String },
    alt: String,
    category: { type: String, default: "events" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
