import { z } from "zod";
import { isAdminRequest } from "@/lib/auth";
import { galleryImages } from "@/lib/constants";
import { connectMongo } from "@/lib/mongodb";

const gallerySchema = z.object({
  category: z.string().min(2),
  featured: z.boolean().optional(),
  imageUrl: z.string().min(2),
  tag: z.string().optional(),
  title: z.string().min(2),
});

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const connection = await connectMongo();
  if (!connection) {
    return Response.json({ images: galleryImages, mode: "preview" });
  }

  const { GalleryImage } = await import("@/models/GalleryImage");
  const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
  return Response.json({ images, mode: "database" });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = gallerySchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Gallery title, category, and image URL are required." }, { status: 400 });
  }

  const connection = await connectMongo();
  if (!connection) {
    return Response.json({ image: parsed.data, mode: "preview" });
  }

  const { GalleryImage } = await import("@/models/GalleryImage");
  const image = await GalleryImage.create(parsed.data);
  return Response.json({ image, mode: "database" });
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await request.json()) as { id?: string };
  const connection = await connectMongo();

  if (connection && id) {
    const { GalleryImage } = await import("@/models/GalleryImage");
    await GalleryImage.findByIdAndDelete(id).catch(() => null);
  }

  return Response.json({ status: "deleted" });
}
