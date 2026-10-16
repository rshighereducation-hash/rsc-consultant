import mongoose, { type InferSchemaType } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },

    referenceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    submittedAt: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    destination: { type: String, required: true },
    studyLevel: { type: String, required: true },
    targetIntake: { type: String, required: true },
    ieltsStatus: { type: String, required: true },
    academicBackground: { type: String, required: true },
    course: { type: String, required: true },
    message: { type: String, default: "" },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export type StudentRecord = InferSchemaType<typeof studentSchema>;

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
