import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { required: true, trim: true, unique: true, type: String },
    passwordHash: { required: true, type: String },
    role: { default: "admin", type: String },
  },
  { timestamps: true },
);

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
