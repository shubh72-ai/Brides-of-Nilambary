import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function BookingCancelledPage() {
  return (
    <main className="status-page nilambary-site inner-page">
      <Navbar />
      <section className="status-card glass-panel">
        <p className="eyebrow">Reservation paused</p>
        <h1>Your date has not been reserved yet.</h1>
        <p>
          No payment was taken. Return to the booking form when you are ready, or
          contact Brides of Nilambary for personal assistance.
        </p>
        <Link className="magnetic-button secondary" href="/booking">
          Return to booking
        </Link>
      </section>
      <Footer />
    </main>
  );
}
