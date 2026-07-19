"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroFrameCanvas } from "@/components/home/HeroFrameCanvas";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { brand, contact } from "@/lib/constants";
import { normalizePhoneForTel, whatsappLink } from "@/lib/utils";

const HERO_FRAME_CONFIG = {
  // The supplied 478-frame sequence currently lives in public/frames.
  fallbackImage: "/frames/frame_0001.webp",
  fileExtension: "webp",
  framePathPrefix: "/frames/frame_",
  // Update this value if frames are added to or removed from the sequence.
  totalFrames: 478,
} as const;

const navItems = [
  { href: "#top", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
] as const;

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
          <div
            aria-hidden={duplicate || undefined}
            className="offer-ticker-group"
            key={String(duplicate)}
          >
            <strong>Limited Bridal Season Offer</strong>
            <span>
              Book your date today and receive a complimentary saree draping consultation.
            </span>
            <Link href="/booking" tabIndex={duplicate ? -1 : undefined}>
              Reserve My Date
            </Link>
            <span>{availability}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function HeroSection() {
  return (
    <section
      className="hero-sequence cinematic-hero"
      data-hero-sequence
      id="top"
    >
      <div className="hero-sticky">
        <HeroFrameCanvas {...HERO_FRAME_CONFIG} />
        <div className="hero-film" aria-hidden="true" />
        <OfferTicker />

        <nav className="site-nav cinematic-nav" aria-label="Primary navigation">
          <Link
            aria-label={`${brand.name} home`}
            className="brand-mark brand-lockup"
            href="#top"
          >
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
              Call us
            </a>
            <Link className="nav-cta" href="/booking">
              Reserve My Date
            </Link>
          </div>
        </nav>

        <div className="hero-copy cinematic-hero-copy reveal-on-load">
          <p className="eyebrow">Luxury Indian Bridal Artistry</p>
          <h1>{brand.headline}</h1>
          <p className="hero-subtitle">{brand.subheadline}</p>
          <div className="hero-actions">
            <MagneticButton href="/booking">Reserve My Date</MagneticButton>
            <MagneticButton href="#transformations" variant="secondary">
              View Bridal Transformations
            </MagneticButton>
          </div>
        </div>

        <div className="scroll-cue cinematic-scroll-cue" aria-hidden="true">
          <span />
          Scroll the transformation
        </div>

        <div className="hero-frame-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
