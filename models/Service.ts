import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
  {
    active: { default: true, type: Boolean },
    category: { required: true, trim: true, type: String },
    description: { required: true, trim: true, type: String },
    duration: { trim: true, type: String },
    image: { trim: true, type: String },
    price: { default: 0, type: Number },
    slug: { required: true, trim: true, unique: true, type: String },
    title: { required: true, trim: true, type: String },
  },
  { timestamps: true },
);

export const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
