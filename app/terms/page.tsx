import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Booking Terms",
  description: "Booking and deposit information for Brides of Nilambary.",
};

export default function TermsPage() {
  return (
    <main className="nilambary-site inner-page">
      <Navbar />
      <article className="legal-page section-pad">
        <span className="section-kicker">Booking terms</span>
        <h1>A calm, clear start to your wedding-day booking.</h1>
        <p>A date is held only after the studio confirms availability and the required deposit is successfully received.</p>
        <h2>Consultation and timing</h2>
        <p>Final services, start time, travel, inclusions, and balance payment are confirmed directly with the studio before the wedding date.</p>
        <h2>Changes and cancellation</h2>
        <p>Rescheduling, cancellation, and deposit terms depend on notice, availability, and the final written booking confirmation.</p>
        <h2>References</h2>
        <p>Reference images guide the consultation. The final finish is adapted to your features, skin, outfit, jewellery, lighting, and event schedule.</p>
      </article>
      <Footer />
    </main>
  );
}
