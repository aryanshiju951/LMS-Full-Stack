import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
