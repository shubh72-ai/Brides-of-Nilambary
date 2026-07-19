"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { brand, contact } from "@/lib/constants";
import { normalizePhoneForTel, whatsappLink } from "@/lib/utils";

const heroImages = [
  // Replace these paths with the final approved hero collage images when ready.
  {
    alt: "Bridal saree, jewellery, and hairstyle finished for the ceremony",
    className: "hero-collage-main",
    label: "The complete look",
    src: "/gallery/image-12.webp",
  },
  {
    alt: "Close bridal makeup application around the eyes",
    className: "hero-collage-makeup",
    label: "Makeup study",
    src: "/gallery/image-3.webp",
  },
  {
    alt: "Bridal eye, bindi, jewellery, and hair detail",
    className: "hero-collage-detail",
    label: "Jewellery and hair",
    src: "/gallery/image-7.webp",
  },
] as const;

const navItems = [
  { href: "#top", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
];

const contactHref = whatsappLink(
  contact.whatsapp,
  "Hi Brides of Nilambary, I want to enquire about bridal makeup and styling.",
);

function OfferTicker() {
  const [availability, setAvailability] = useState("New bridal slots opening soon");

  useEffect(() => {
    const updateAvailability = () => {
      const rawDeadline = process.env.NEXT_PUBLIC_OFFER_END_DATE;
      const deadline = rawDeadline ? new Date(rawDeadline) : null;

      if (!deadline || Number.isNaN(deadline.getTime()) || deadline <= new Date()) {
        setAvailability("New bridal slots opening soon");
        return;
      }

      const totalMinutes = Math.max(
        0,
        Math.floor((deadline.getTime() - Date.now()) / 60000),
      );
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;
      setAvailability(`${days}d ${hours}h ${minutes}m remaining`);
    };

    updateAvailability();
    const timer = window.setInterval(updateAvailability, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="offer-ticker" aria-label="Bridal calendar availability">
      <div className="offer-ticker-track">
        {[false, true].map((duplicate) => (
          <div aria-hidden={duplicate || undefined} className="offer-ticker-group" key={String(duplicate)}>
            <strong>Limited Bridal Season Offer</strong>
            <span>Book your date today and receive a complimentary saree draping consultation.</span>
            <Link href="/booking" tabIndex={duplicate ? -1 : undefined}>Reserve My Date</Link>
            <span>{availability}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function EditorialHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="editorial-hero" id="top">
      <OfferTicker />

      <nav className="site-nav editorial-nav" aria-label="Primary navigation">
        <Link className="brand-mark brand-lockup" href="#top" aria-label={`${brand.name} home`}>
          <BrandLockup />
        </Link>
        <div className="nav-links">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <a
            aria-label={`Contact ${brand.name} on WhatsApp`}
            className="nav-cta hero-whatsapp"
            href={contactHref}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp enquiry
          </a>
          <a
            aria-label={`Call ${brand.name}`}
            className="nav-cta nav-call"
            href={normalizePhoneForTel(contact.phone)}
          >
            Call Us
          </a>
          <Link className="nav-cta" href="/booking">
            Reserve My Date
          </Link>
        </div>
      </nav>

      <div className="hero-gold-dust" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="editorial-hero-layout">
        <div className="hero-collage" aria-label="Bridal artistry details">
          {heroImages.map((image, index) => (
            <motion.figure
              animate={{ opacity: 1, y: 0 }}
              className={`hero-collage-frame ${image.className}`}
              initial={reducedMotion ? false : { y: 18 + index * 7 }}
              key={image.src}
              transition={{
                delay: 0.12 + index * 0.1,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                alt={image.alt}
                fill
                priority={index === 0}
                sizes={
                  index === 0
                    ? "(max-width: 900px) 66vw, 38vw"
                    : "(max-width: 900px) 34vw, 18vw"
                }
                src={image.src}
              />
              <figcaption>{image.label}</figcaption>
            </motion.figure>
          ))}
          <span className="hero-collage-index" aria-hidden="true">
            01 / Bridal artistry
          </span>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="editorial-hero-copy"
          initial={reducedMotion ? false : { x: 24 }}
          transition={{ delay: 0.22, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Luxury Indian bridal artistry</p>
          <h1>{brand.headline}</h1>
          <p className="hero-subtitle">{brand.subheadline}</p>
          <div className="hero-actions">
            <MagneticButton href="/booking">Reserve My Date</MagneticButton>
            <MagneticButton href="/gallery" variant="secondary">
              View Bridal Transformations
            </MagneticButton>
          </div>
          <div className="hero-signature-line" aria-label="Core bridal services">
            <span>Makeup</span>
            <span>Saree styling</span>
            <span>Hairstyling</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
