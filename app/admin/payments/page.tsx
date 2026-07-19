import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Manage Payments",
};

export default async function AdminPaymentsPage() {
  await requireAdminSession();

  return (
    <main className="nilambary-site admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <AdminHeader eyebrow="Payments" title="Review Razorpay deposits" />
        <PaymentTable />
      </section>
    </main>
  );
}
