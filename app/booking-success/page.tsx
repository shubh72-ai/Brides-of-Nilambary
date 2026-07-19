import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function BookingSuccessPage() {
  return (
    <main className="status-page nilambary-site inner-page">
      <Navbar />
      <section className="status-card glass-panel">
        <p className="eyebrow">Date reserved</p>
        <h1>Your bridal moment is officially in the calendar.</h1>
        <p>
          Your booking is confirmed after successful Razorpay deposit verification.
          The studio will contact you to refine services, timing, and your complete look.
        </p>
        <Link className="magnetic-button primary" href="/booking">
          Review booking details
        </Link>
      </section>
      <Footer />
    </main>
  );
}
