import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    amount: { required: true, type: Number },
    bookingId: { ref: "Booking", type: Schema.Types.ObjectId },
    currency: { default: "INR", type: String },
    razorpayOrderId: { required: true, trim: true, type: String },
    razorpayPaymentId: { trim: true, type: String },
    razorpaySignature: { trim: true, type: String },
    status: {
      default: "created",
      enum: ["created", "paid", "failed"],
      type: String,
    },
  },
  { timestamps: true },
);

export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
