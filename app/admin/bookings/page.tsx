import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { BookingTable } from "@/components/admin/BookingTable";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Manage Bookings",
};

export default async function AdminBookingsPage() {
  await requireAdminSession();

  return (
    <main className="nilambary-site admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <AdminHeader eyebrow="Bookings" title="Manage bridal appointments" />
        <BookingTable />
      </section>
    </main>
  );
}
