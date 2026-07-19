import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Manage Gallery",
};

export default async function AdminGalleryPage() {
  await requireAdminSession();

  return (
    <main className="nilambary-site admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <AdminHeader eyebrow="Gallery" title="Manage bridal gallery images" />
        <GalleryManager />
      </section>
    </main>
  );
}
