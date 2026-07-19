import mongoose, { Schema } from "mongoose";

const GalleryImageSchema = new Schema(
  {
    beforeAfterType: { trim: true, type: String },
    category: { required: true, trim: true, type: String },
    featured: { default: false, type: Boolean },
    imageUrl: { required: true, trim: true, type: String },
    tag: { trim: true, type: String },
    title: { required: true, trim: true, type: String },
  },
  { timestamps: true },
);

export const GalleryImage =
  mongoose.models.GalleryImage || mongoose.model("GalleryImage", GalleryImageSchema);
