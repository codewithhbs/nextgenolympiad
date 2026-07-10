import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },
    name: { type: String, required: true, trim: true },
    image: { url: String, publicId: String },
    studentCode: { type: String, required: true, trim: true, uppercase: true, index: true },
    class: { type: String, required: true, trim: true },
    section: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    dob: Date,
    parentName: { type: String, trim: true },
    mobile: { type: String, trim: true },
  },
  { timestamps: true }
);

studentSchema.index({ school: 1, studentCode: 1 }, { unique: true });

export default mongoose.models.Student || mongoose.model("Student", studentSchema);
