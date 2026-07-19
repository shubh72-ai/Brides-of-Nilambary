import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Brides of Nilambary handles bridal enquiry and booking information.",
};

export default function PrivacyPage() {
  return (
    <main className="nilambary-site inner-page">
      <Navbar />
      <article className="legal-page section-pad">
        <span className="section-kicker">Privacy</span>
        <h1>Your bridal details are treated with care.</h1>
        <p>Information shared through enquiry and booking forms is used to respond, plan services, process deposits, and manage appointments.</p>
        <h2>What we collect</h2>
        <p>We may collect your name, contact details, wedding date, venue, selected services, notes, and voluntarily uploaded references.</p>
        <h2>Payments and images</h2>
        <p>Payment details are handled by Razorpay. Portfolio or reference images are not published without appropriate permission.</p>
        <h2>Contact</h2>
        <p>Use the email or WhatsApp link in the footer to request access, correction, or deletion of your enquiry information.</p>
      </article>
      <Footer />
    </main>
  );
}
