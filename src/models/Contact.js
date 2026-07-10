import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read", "replied", "closed"], default: "new", index: true },
    reply: { message: String, repliedAt: Date, repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  },
  { timestamps: true }
);
export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
