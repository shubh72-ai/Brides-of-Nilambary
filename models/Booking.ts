import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    bookingStatus: {
      default: "pending",
      enum: ["pending", "confirmed", "completed", "cancelled"],
      type: String,
    },
    depositAmount: { default: 10000, type: Number },
    email: { trim: true, type: String },
    eventDate: { required: true, type: String },
    eventLocation: { trim: true, type: String },
    eventTime: { required: true, type: String },
    name: { required: true, trim: true, type: String },
    notes: { trim: true, type: String },
    paymentStatus: {
      default: "pending",
      enum: ["pending", "paid", "failed"],
      type: String,
    },
    phone: { required: true, trim: true, type: String },
    razorpayOrderId: { trim: true, type: String },
    razorpayPaymentId: { trim: true, type: String },
    referenceImages: [{ type: String }],
    service: { required: true, trim: true, type: String },
    services: [{ trim: true, type: String }],
  },
  { timestamps: true },
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
