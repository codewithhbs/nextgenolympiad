import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true, index: true },
    name: { type: String, required: true, trim: true },
    image: { url: String, publicId: String },
    studentCode: { type: String, required: true, trim: true, uppercase: true, index: true }, // Enrollment No
    class: { type: String, required: true, trim: true },
    section: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, uppercase: true, default: "" },
    city: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    barcode: { type: String, trim: true, default: "" },
    dob: Date,
    parentName: { type: String, trim: true },
    mobile: { type: String, trim: true },
  },
  { timestamps: true }
);

// Same enrollment no can appear once per subject (one Excel per subject)
studentSchema.index({ school: 1, studentCode: 1, subject: 1 }, { unique: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

// One-time migration: drop old unique index (school + studentCode) so per-subject rows are allowed
let indexesReady = false;
export async function ensureStudentIndexes() {
  if (indexesReady) return;
  try {
    const idx = await Student.collection.indexes();
    if (idx.some((i) => i.name === "school_1_studentCode_1")) {
      await Student.collection.dropIndex("school_1_studentCode_1");
    }
    await Student.createIndexes();
  } catch (e) {
    if (e?.codeName !== "NamespaceNotFound") console.error("Student index migration:", e.message);
  }
  indexesReady = true;
}

export default Student;
