import { z } from "zod";
import { brand } from "@/lib/constants";
import { connectMongo } from "@/lib/mongodb";
import { createBookingReference } from "@/lib/utils";

const bookingSchema = z.object({
  email: z.string().optional(),
  eventDate: z.string().min(1),
  eventLocation: z.string().optional(),
  eventTime: z.string().optional(),
  name: z.string().min(2),
  notes: z.string().optional(),
  phone: z.string().min(8),
  referenceImages: z.array(z.string()).optional(),
  service: z.string().min(2),
  slot: z.string().optional(),
});

async function requestPayload(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const form = await request.formData();
  return {
    email: form.get("email")?.toString() ?? "",
    eventDate: form.get("eventDate")?.toString() ?? "",
    eventLocation: form.get("eventLocation")?.toString() ?? "",
    eventTime: form.get("eventTime")?.toString() || form.get("slot")?.toString() || "",
    name: form.get("name")?.toString() ?? "",
    notes: form.get("notes")?.toString() ?? "",
    phone: form.get("phone")?.toString() ?? "",
    service: form.get("service")?.toString() ?? "",
    slot: form.get("slot")?.toString() ?? "",
  };
}

export async function POST(request: Request) {
  const parsed = bookingSchema.safeParse(await requestPayload(request));

  if (!parsed.success) {
    return Response.json(
      { error: "Name, phone, service, wedding date, and appointment time are required." },
      { status: 400 },
    );
  }

  const values = parsed.data;
  const eventTime = values.eventTime || values.slot || "";
  const reference = createBookingReference();
  const connection = await connectMongo();

  if (connection) {
    const { Booking } = await import("@/models/Booking");
    const booking = await Booking.create({
      depositAmount: brand.depositAmount,
      email: values.email,
      eventDate: values.eventDate,
      eventLocation: values.eventLocation,
      eventTime,
      name: values.name,
      notes: values.notes,
      paymentStatus: "pending",
      phone: values.phone,
      referenceImages: values.referenceImages ?? [],
      service: values.service,
    });

    return Response.json({
      bookingId: booking._id.toString(),
      checkoutUrl: `/booking-success?booking=${booking._id.toString()}`,
      message: "Booking request captured. Razorpay deposit checkout can now be created.",
      reference,
      status: "pending_payment",
    });
  }

  return Response.json({
    bookingId: reference,
    checkoutUrl: `/booking-success?booking=${reference}&preview=1`,
    message:
      "Booking request captured in preview mode. Add MongoDB and Razorpay credentials to persist and collect deposits.",
    reference,
    status: "preview",
  });
}
