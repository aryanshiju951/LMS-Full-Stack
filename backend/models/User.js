import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"],
    default: "student"
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema); 
export default User;
