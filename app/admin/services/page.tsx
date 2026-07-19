import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Manage Services",
};

export default async function AdminServicesPage() {
  await requireAdminSession();

  return (
    <main className="nilambary-site admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <AdminHeader eyebrow="Services" title="Manage the bridal service menu" />
        <ServicesManager />
      </section>
    </main>
  );
}
