import { z } from "zod";
import { connectMongo } from "@/lib/mongodb";
import { createRazorpayOrder, depositAmountPaise } from "@/lib/razorpay";

const orderSchema = z.object({
  bookingId: z.string().min(2),
});

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "Booking id is required." }, { status: 400 });
  }

  const orderResult = await createRazorpayOrder(parsed.data.bookingId, depositAmountPaise());

  if (!orderResult.configured || !orderResult.order) {
    return Response.json({
      configured: false,
      keyId: orderResult.keyId,
      message: "Razorpay keys are not configured. Preview success flow is active.",
      order: null,
    });
  }

  const connection = await connectMongo();

  if (connection) {
    const [{ Booking }, { Payment }] = await Promise.all([
      import("@/models/Booking"),
      import("@/models/Payment"),
    ]);

    await Booking.findByIdAndUpdate(parsed.data.bookingId, {
      razorpayOrderId: orderResult.order.id,
    }).catch(() => null);

    await Payment.create({
      amount: orderResult.order.amount,
      bookingId: parsed.data.bookingId,
      currency: orderResult.order.currency,
      razorpayOrderId: orderResult.order.id,
      status: "created",
    }).catch(() => null);
  }

  return Response.json({
    configured: true,
    keyId: orderResult.keyId,
    order: orderResult.order,
  });
}
