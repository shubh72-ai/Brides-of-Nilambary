import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5),
  name: z.string().min(2),
  phone: z.string().min(8),
  serviceInterest: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "Please add your name, phone, and message." }, { status: 400 });
  }

  return Response.json({
    message:
      "Contact request received. Connect this endpoint to email, WhatsApp, or CRM when the studio workflow is finalized.",
    status: "received",
  });
}
