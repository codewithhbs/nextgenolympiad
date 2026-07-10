import mongoose from "mongoose";
const auditSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entity: String,
    entityId: String,
    meta: mongoose.Schema.Types.Mixed,
    ip: String,
  },
  { timestamps: true }
);
export default mongoose.models.AuditLog || mongoose.model("AuditLog", auditSchema);
