import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { BookingTable } from "@/components/admin/BookingTable";
import { PaymentTable } from "@/components/admin/PaymentTable";
import { adminStats } from "@/lib/constants";
import { requireAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdminSession();

  return (
    <main className="nilambary-site admin-shell">
      <AdminSidebar />
      <section className="admin-main">
        <AdminHeader eyebrow="Dashboard" title="Studio command room" />
        <div className="admin-stat-grid">
          {adminStats.map((stat) => (
            <article className="admin-stat glass-panel" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>
        <BookingTable />
        <PaymentTable />
      </section>
    </main>
  );
}
