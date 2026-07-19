import type { Metadata } from "next";
import { GalleryEntryPlinths } from "@/components/gallery/GalleryEntryPlinths";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ImmersiveGalleryLoader } from "@/components/gallery/ImmersiveGalleryLoader";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Immersive bridal transformation gallery for Brides of Nilambary.",
};

export default function GalleryPage() {
  return (
    <main className="nilambary-site inner-page gallery-page">
      <Navbar />
      <section className="page-hero gallery-entry-hero section-pad">
        <SectionHeading
          copy="Explore bridal finishes, eye details, saree drapes, hair styling, and transformation moments designed for timeless wedding memories."
          kicker="Bridal gallery"
          title="Looks That Live Beyond the Lens"
        />
        <GalleryEntryPlinths />
      </section>
      <div id="immersive-gallery">
        <ImmersiveGalleryLoader />
      </div>
      <GalleryGrid />
      <Footer />
    </main>
  );
}
