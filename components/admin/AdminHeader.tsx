export function AdminHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="admin-header">
      <span className="section-kicker">{eyebrow}</span>
      <h1>{title}</h1>
      <p>Protected studio controls for bookings, payments, gallery images, and service menu content.</p>
    </header>
  );
}
