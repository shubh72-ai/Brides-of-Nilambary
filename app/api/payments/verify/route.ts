import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { verifyRazorpaySignature } from "@/lib/razorpay";

const verifySchema = z.object({
  bookingId: z.string().min(2),
  orderId: z.string().min(2),
  paymentId: z.string().min(2),
  signature: z.string().min(2),
});

export async function POST(request: Request) {
  const parsed = verifySchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "Payment verification data is incomplete." }, { status: 400 });
  }

  const valid = await verifyRazorpaySignature(parsed.data);

  if (!valid) {
    return Response.json({ error: "Payment signature could not be verified." }, { status: 400 });
  }

  const connection = await connectMongo();

  if (connection) {
    const [{ Booking }, { Payment }] = await Promise.all([
      import("@/models/Booking"),
      import("@/models/Payment"),
    ]);

    await Booking.findByIdAndUpdate(parsed.data.bookingId, {
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      razorpayOrderId: parsed.data.orderId,
      razorpayPaymentId: parsed.data.paymentId,
    }).catch(() => null);

    await Payment.findOneAndUpdate(
      { razorpayOrderId: parsed.data.orderId },
      {
        razorpayPaymentId: parsed.data.paymentId,
        razorpaySignature: parsed.data.signature,
        status: "paid",
      },
    ).catch(() => null);
  }

  return Response.json({ status: "verified" });
}
