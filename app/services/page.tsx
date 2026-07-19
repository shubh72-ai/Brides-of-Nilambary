import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCatalog } from "@/lib/constants";
import { formatInr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Luxury bridal makeup, hairstyling, Maharashtrian bridal styling, saree draping, and jewellery styling by Brides of Nilambary.",
};

export default function ServicesPage() {
  return (
    <main className="nilambary-site inner-page">
      <Navbar />
      <section className="page-hero section-pad services-page-hero">
        <SectionHeading
          copy="From makeup to drape, jewellery, fabric, and camera presence — every element is composed as one complete bridal look."
          kicker="The bridal atelier"
          title="Every Detail, Styled for the Aisle"
        />
        <MagneticButton href="/booking">Reserve My Date</MagneticButton>
      </section>

      <section className="service-directory section-pad">
        {serviceCatalog.map((service, index) => (
          <article className="service-directory-card glass-panel" key={service.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Image
              alt={service.title}
              height={900}
              loading="lazy"
              sizes="(max-width: 900px) 92vw, 38vw"
              src={service.image}
              width={720}
            />
            <div>
              <small>{service.category}</small>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <strong>
                {service.duration} / {formatInr(service.price)}
              </strong>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}
