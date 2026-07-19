import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/services", label: "Services" },
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar glass-panel">
      <Link className="admin-brand" href="/">
        Brides of Nilambary
      </Link>
      <nav aria-label="Admin navigation">
        {adminLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
