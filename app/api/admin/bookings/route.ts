import { isAdminRequest } from "@/lib/auth";
import { connectMongo } from "@/lib/mongodb";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const connection = await connectMongo();

  if (!connection) {
    return Response.json({
      bookings: [
        {
          bookingStatus: "pending",
          eventDate: "2026-12-12",
          eventTime: "8:30 AM",
          name: "Preview Bride",
          paymentStatus: "pending",
          phone: "+91 98765 43210",
          service: "Maharashtrian Bridal Look",
        },
      ],
      mode: "preview",
    });
  }

  const { Booking } = await import("@/models/Booking");
  const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50).lean();
  return Response.json({ bookings, mode: "database" });
}
