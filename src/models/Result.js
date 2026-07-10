import mongoose from "mongoose";

const subjectScoreSchema = new mongoose.Schema(
  { subject: String, marks: Number, maxMarks: Number },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },
    studentCode: { type: String, required: true, trim: true, uppercase: true, index: true },
    studentName: { type: String, required: true, trim: true },
    class: { type: String, trim: true },
    section: { type: String, trim: true },
    olympiad: { type: String, default: "NextGen Olympiad" },
    session: { type: String, default: "2026-27" },
    subjects: [subjectScoreSchema],
    totalMarks: { type: Number, default: 0 },
    maxMarks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    level: { type: String, enum: ["school", "zonal", "national"], default: "school" },
    medal: { type: String, enum: ["none", "gold", "silver", "bronze"], default: "none" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    batch: { type: String, index: true },
  },
  { timestamps: true }
);

resultSchema.index({ school: 1, studentCode: 1, session: 1 }, { unique: true });

export default mongoose.models.Result || mongoose.model("Result", resultSchema);
