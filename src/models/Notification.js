import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "success", "warning", "result", "approval"], default: "info" },
    isRead: { type: Boolean, default: false, index: true },
    link: String,
  },
  { timestamps: true }
);
export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
