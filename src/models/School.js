import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    code: { type: String, unique: true, sparse: true, trim: true, uppercase: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    contactPerson: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    logo: { url: String, publicId: String },
    board: { type: String, trim: true },

    // Coordinator + Accounts — captured in the school profile (not registration)
    coordinator: { name: String, mobile: String, email: String },
    accounts: { name: String, mobile: String, email: String },

    // Registration payment — completed from the school dashboard after login
    registrationFee: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ["pending", "submitted", "paid"], default: "pending", index: true },
    paymentRef: { type: String, trim: true },
    paymentMethod: { type: String, trim: true },
    paidAt: Date,

    status: { type: String, enum: ["pending", "approved", "rejected", "suspended"], default: "pending", index: true },
    // Raw dynamic registration answers (from public multi-step form)
    registrationData: { type: mongoose.Schema.Types.Mixed },
    registrationSlug: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
    rejectionReason: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

schoolSchema.pre("save", async function (next) {
  if (!this.code) {
    this.code = "SCH" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
  }
  next();
});

export default mongoose.models.School || mongoose.model("School", schoolSchema);
