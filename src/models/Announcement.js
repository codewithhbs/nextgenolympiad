import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    link: { type: String, trim: true },
    tag: { type: String, default: "Update" }, // e.g. Exam, Result, Registration
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);
export default mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
