import { z } from "zod";
import { isAdminRequest } from "@/lib/auth";
import { serviceCatalog } from "@/lib/constants";
import { connectMongo } from "@/lib/mongodb";

const serviceSchema = z.object({
  active: z.boolean().optional(),
  category: z.string().min(2),
  description: z.string().min(5),
  duration: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
});

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const connection = await connectMongo();
  if (!connection) {
    return Response.json({ mode: "preview", services: serviceCatalog });
  }

  const { Service } = await import("@/models/Service");
  const services = await Service.find().sort({ title: 1 }).lean();
  return Response.json({ mode: "database", services });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = serviceSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Service title, slug, category, and description are required." }, { status: 400 });
  }

  const connection = await connectMongo();
  if (!connection) {
    return Response.json({ mode: "preview", service: parsed.data });
  }

  const { Service } = await import("@/models/Service");
  const service = await Service.findOneAndUpdate({ slug: parsed.data.slug }, parsed.data, {
    new: true,
    upsert: true,
  });

  return Response.json({ mode: "database", service });
}
