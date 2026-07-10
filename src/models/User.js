import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["super_admin", "admin", "school"], default: "school", index: true },
    phone: { type: String, trim: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", default: null },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    otp: { code: { type: String, select: false }, expiresAt: { type: Date, select: false } },
    resetToken: { token: { type: String, select: false }, expiresAt: { type: Date, select: false } },
    refreshTokens: { type: [String], select: false, default: [] },
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
