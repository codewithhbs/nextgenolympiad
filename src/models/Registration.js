import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    formSlug: { type: String, required: true, index: true },
    formTitle: String,
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    schoolName: { type: String, index: true },
    email: { type: String, lowercase: true, index: true },
    phone: String,
    totalStudents: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    data: { type: mongoose.Schema.Types.Mixed, default: {} }, // full dynamic answers
    status: { type: String, enum: ["pending", "verified", "paid", "rejected"], default: "pending", index: true },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.models.Registration || mongoose.model("Registration", registrationSchema);
