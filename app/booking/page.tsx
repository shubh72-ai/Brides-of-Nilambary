import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Booking",
  description: "Reserve a Brides of Nilambary bridal makeup and styling appointment with a Razorpay-ready deposit flow.",
};

export default function BookingPage() {
  return (
    <main className="nilambary-site inner-page">
      <Navbar />
      <section className="booking-page section-pad">
        <SectionHeading
          copy="Choose your service, share your event details, and secure your date with a booking deposit."
          kicker="Private booking"
          title="Reserve Your Bridal Moment"
        />
        <BookingForm />
      </section>
      <Footer />
    </main>
  );
}
