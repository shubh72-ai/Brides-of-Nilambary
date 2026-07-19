"use client";

import type { FormEvent, PointerEvent } from "react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { HeroSection } from "@/components/home/HeroSection";
import { contact } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const services = [
  {
    title: "Premium Bridal Makeup",
    price: "From Rs. 35,000",
    image: "/frames/frame_0036.webp",
    detail:
      "Skin-first glam, sculpted eyes, luminous complexion work, and long-wear finishing for ceremony-to-reception days.",
  },
  {
    title: "Saree Draping & Binding",
    price: "From Rs. 8,500",
    image: "/frames/frame_0112.webp",
    detail:
      "Clean pleats, secure bridal binding, veil setting, and movement-tested drapes for rituals and portraits.",
  },
  {
    title: "Bridal Hairstyling",
    price: "From Rs. 7,500",
    image: "/frames/frame_0196.webp",
    detail:
      "Elegant buns, soft curls, gajra placement, hair accessories, and camera-ready finishing for the complete bridal silhouette.",
  },
  {
    title: "Custom Bridal Look Design",
    price: "Consultation led",
    image: "/frames/frame_0288.webp",
    detail:
      "Look direction, fabric coordination, jewellery pairing, and full transformation planning for your wedding story.",
  },
];

const gallery = [
  { image: "/frames/frame_0001.webp", label: "Soft rose nikaah glow" },
  { image: "/frames/frame_0048.webp", label: "Temple-gold reception glam" },
  { image: "/frames/frame_0096.webp", label: "Emerald jewellery styling" },
  { image: "/frames/frame_0144.webp", label: "Ivory veil finish" },
  { image: "/frames/frame_0192.webp", label: "Sculpted bridal eye" },
  { image: "/frames/frame_0240.webp", label: "Rich red ceremony look" },
  { image: "/frames/frame_0288.webp", label: "Champagne shimmer skin" },
  { image: "/frames/frame_0336.webp", label: "Saree drape portrait" },
  { image: "/frames/frame_0384.webp", label: "Muted mehendi elegance" },
  { image: "/frames/frame_0432.webp", label: "Signature bridal finish" },
];

const portfolioGallery = [
  {
    image: "/frames/frame_0012.webp",
    label: "Pre-ceremony skin prep",
    category: "Makeup",
    mood: "Soft blush finish",
  },
  {
    image: "/frames/frame_0068.webp",
    label: "Gold jewellery balance",
    category: "Styling",
    mood: "Temple-gold glow",
  },
  {
    image: "/frames/frame_0124.webp",
    label: "Saree pleat architecture",
    category: "Draping",
    mood: "Secure ritual drape",
  },
  {
    image: "/frames/frame_0176.webp",
    label: "Reception contour",
    category: "Makeup",
    mood: "Sculpted evening glam",
  },
  {
    image: "/frames/frame_0228.webp",
    label: "Veil and neckline setting",
    category: "Styling",
    mood: "Ivory bridal softness",
  },
  {
    image: "/frames/frame_0276.webp",
    label: "Rich red ceremony look",
    category: "Bridal",
    mood: "Classic Indian luxury",
  },
  {
    image: "/frames/frame_0332.webp",
    label: "Emerald jewellery styling",
    category: "Styling",
    mood: "Deep jewel contrast",
  },
  {
    image: "/frames/frame_0388.webp",
    label: "Blouse fit finishing",
    category: "Alteration",
    mood: "Camera-ready tailoring",
  },
  {
    image: "/frames/frame_0448.webp",
    label: "Final portrait polish",
    category: "Bridal",
    mood: "Brides of Nilambary signature",
  },
];

const testimonials = [
  {
    quote:
      "The look stayed graceful through every ritual, every hug, every photograph. It felt like me, only elevated.",
    name: "Aarohi",
    event: "Hyderabad bridal ceremony",
  },
  {
    quote:
      "Brides of Nilambary handled makeup, drape, jewellery, and calm energy. That last part mattered most on the wedding morning.",
    name: "Meera",
    event: "Destination reception",
  },
  {
    quote:
      "The saree structure was flawless. I could move, sit, dance, and still look perfectly styled in every shot.",
    name: "Ishani",
    event: "South Indian wedding",
  },
];

const faqs = [
  {
    q: "How early should I book?",
    a: "For peak wedding months, reserve 8 to 12 weeks ahead. Last-minute appointments can be requested if the calendar allows.",
  },
  {
    q: "Can I share reference images?",
    a: "Yes. The booking form accepts reference uploads so the studio can understand makeup, hair, blouse, and saree preferences.",
  },
  {
    q: "Is the deposit refundable?",
    a: "Deposit terms should be confirmed by the studio before payment. The current site is wired as a local booking preview.",
  },
];

const timeSlots = ["6:00 AM", "8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM"];
// Replace NEXT_PUBLIC_WHATSAPP_NUMBER with the verified studio number before launch.
const contactHref = whatsappLink(
  contact.whatsapp,
  "Hi Brides of Nilambary, I want to enquire about bridal makeup and styling.",
);

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const button = ref.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.setProperty("--magnet-x", `${x * 0.14}px`);
    button.style.setProperty("--magnet-y", `${y * 0.18}px`);
  }

  function resetMagnet() {
    const button = ref.current;
    if (!button) return;
    button.style.setProperty("--magnet-x", "0px");
    button.style.setProperty("--magnet-y", "0px");
  }

  return (
    <a
      className={`magnetic-button ${variant}`}
      href={href}
      onPointerLeave={resetMagnet}
      onPointerMove={handlePointerMove}
      ref={ref}
    >
      <span>{children}</span>
    </a>
  );
}

function ServiceSection() {
  return (
    <section className="services-section section-pad" id="services">
      <div className="section-kicker">Services and products</div>
      <div className="split-heading">
        <h2><em>Every Detail,</em> Styled for the Aisle</h2>
        <p>
          From makeup to drape, jewellery, fabric, and camera presence — every element
          is composed as one complete bridal look.
        </p>
      </div>
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <div className="service-image">
              <Image
                alt={service.title}
                height={900}
                loading="lazy"
                sizes="(max-width: 720px) 88vw, 24vw"
                src={service.image}
                width={720}
              />
            </div>
            <div className="service-content">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.detail}</p>
              <strong>{service.price}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SareeStory() {
  return (
    <section className="saree-story section-pad" aria-labelledby="saree-story-title">
      <div className="saree-story-media">
        <Image
          alt="Bridal saree drape and jewellery finishing"
          height={1200}
          loading="lazy"
          sizes="(max-width: 900px) 92vw, 48vw"
          src="/frames/frame_0240.webp"
          width={960}
        />
      </div>
      <div className="saree-story-copy">
        <span className="section-kicker">The finishing ritual</span>
        <h2 id="saree-story-title">A drape designed to move beautifully.</h2>
        <p>
          Pleat architecture, pallu fall, veil placement, jewellery balance, and hair
          are refined as one complete silhouette. The result stays secure through
          rituals while remaining soft and elegant in every portrait.
        </p>
        <div className="saree-story-points" aria-label="Saree styling benefits">
          <span>Pre-pleated box folding</span>
          <span>Movement-tested draping</span>
          <span>Jewellery and veil balance</span>
        </div>
        <MagneticButton href="/services">Explore bridal services</MagneticButton>
      </div>
    </section>
  );
}

function SphereGallery() {
  const [rotation, setRotation] = useState({ x: -8, y: -18 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; rx: number; ry: number } | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState<(typeof portfolioGallery)[number] | null>(
    null,
  );

  useEffect(() => {
    if (dragStart) return;
    const timer = window.setInterval(() => {
      setRotation((value) => ({ ...value, y: value.y - 0.35 }));
    }, 42);
    return () => window.clearInterval(timer);
  }, [dragStart]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ x: event.clientX, y: event.clientY, rx: rotation.x, ry: rotation.y });
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragStart) return;
    const nextY = dragStart.ry + (event.clientX - dragStart.x) * 0.24;
    const nextX = Math.max(-32, Math.min(18, dragStart.rx - (event.clientY - dragStart.y) * 0.16));
    setRotation({ x: nextX, y: nextY });
  }

  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="gallery-intro">
        <div>
          <div className="section-kicker">Spherical client gallery</div>
          <h2>Looks That Live Beyond the Lens</h2>
        </div>
        <p>
          Explore bridal finishes, eye details, saree drapes, hair styling, and
          transformation moments designed for timeless wedding memories.
        </p>
      </div>

      <div className="gallery-feature glass-panel">
        <div className="gallery-feature-copy">
          <span>Featured 3D gallery</span>
          <strong>Rotate bridal looks in a cinematic globe.</strong>
          <p>Drag or swipe the sphere, then use the lookbook below for a fuller gallery view.</p>
        </div>
        <div
          aria-label="Interactive rotating bridal gallery"
          className="sphere-stage"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={() => setDragStart(null)}
          role="region"
        >
          <div
            className="sphere"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {gallery.map((item, index) => {
              const angle = (360 / gallery.length) * index;
              const vertical = index % 2 === 0 ? -28 : 28;
              return (
                <figure
                  className="sphere-card"
                  key={item.image}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(var(--sphere-radius)) translateY(${vertical}px)`,
                  }}
                >
                  <Image
                    alt={item.label}
                    height={720}
                    loading="lazy"
                    sizes="(max-width: 900px) 42vw, 18vw"
                    src={item.image}
                    width={560}
                  />
                  <figcaption>{item.label}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gallery-wall" aria-label="Complete bridal portfolio gallery">
        <div className="gallery-wall-copy">
          <span className="eyebrow">Complete gallery</span>
          <h3>Portfolio moments arranged like a private lookbook.</h3>
          <p>
            Explore close studies of skin, eyes, drape structure, jewellery placement,
            and the final portrait-ready finish.
          </p>
        </div>
        <div className="gallery-masonry">
          {portfolioGallery.map((item, index) => (
            <button
              className={`gallery-tile tile-${(index % 5) + 1}`}
              key={item.image}
              onClick={() => setSelectedImage(item)}
              type="button"
            >
              <Image
                alt={item.label}
                height={900}
                loading="lazy"
                sizes="(max-width: 720px) 92vw, 34vw"
                src={item.image}
                width={720}
              />
              <span className="gallery-tile-copy">
                <span>{item.category}</span>
                <strong>{item.label}</strong>
                <em>{item.mood}</em>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div
          aria-label="Selected bridal gallery image"
          className="gallery-lightbox"
          role="dialog"
        >
          <button
            aria-label="Close gallery image"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            type="button"
          >
            Close
          </button>
          <Image
            alt={selectedImage.label}
            height={1500}
            sizes="(max-width: 720px) 96vw, 70vw"
            src={selectedImage.image}
            width={1200}
          />
          <div className="lightbox-caption glass-panel">
            <span>{selectedImage.category}</span>
            <strong>{selectedImage.label}</strong>
            <p>{selectedImage.mood}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function BookingSection() {
  const [selectedService, setSelectedService] = useState(services[0].title);
  const [slot, setSlot] = useState(timeSlots[1]);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "Bride");
    form.set("service", selectedService);
    form.set("slot", slot);

    try {
      const response = await fetch("/api/bookings", {
        body: form,
        method: "POST",
      });
      const result = (await response.json()) as {
        bookingId?: string;
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Booking could not be prepared.");
      }

      setConfirmation(
        `${name}, your ${selectedService.toLowerCase()} request is ready. Reference ${result.bookingId}. Connect payment keys to send this slot into secure deposit checkout.`,
      );
    } catch (error) {
      setConfirmation(
        error instanceof Error
          ? error.message
          : "Booking could not be prepared. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const minimumDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <section className="booking-section section-pad" id="booking">
      <div className="booking-copy">
        <div className="section-kicker">Private booking</div>
        <h2>Reserve Your Bridal Moment</h2>
        <p>
          Choose your service, share your event details, and secure your date with a
          booking deposit.
        </p>
        <div className="booking-stats">
          <span>
            <strong>4 hr</strong>
            bridal glam blocks
          </span>
          <span>
            <strong>1:1</strong>
            look planning
          </span>
          <span>
            <strong>Rs. 10k</strong>
            secure booking deposit
          </span>
        </div>
      </div>

      <form className="booking-form glass-panel" onSubmit={handleSubmit}>
        <label>
          Bride name
          <input name="name" placeholder="Your full name" required />
        </label>
        <div className="form-row">
          <label>
            Phone
            <input inputMode="tel" name="phone" placeholder="+91 98765 43210" required />
          </label>
          <label>
            Email
            <input name="email" placeholder="you@example.com" type="email" />
          </label>
        </div>
        <label>
          Service
          <select
            name="service"
            onChange={(event) => setSelectedService(event.target.value)}
            value={selectedService}
          >
            {services.map((service) => (
              <option key={service.title}>{service.title}</option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label>
            Wedding date
            <input min={minimumDate} name="eventDate" required type="date" />
          </label>
          <label>
            Location
            <input name="eventLocation" placeholder="Venue or city" />
          </label>
        </div>
        <div className="slot-group" role="radiogroup" aria-label="Preferred appointment time">
          {timeSlots.map((time) => (
            <button
              aria-checked={slot === time}
              className={slot === time ? "slot active" : "slot"}
              key={time}
              onClick={() => setSlot(time)}
              role="radio"
              type="button"
            >
              {time}
            </button>
          ))}
        </div>
        <label>
          Reference images
          <input accept="image/*" multiple name="references" type="file" />
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            placeholder="Tell us about outfits, jewellery, skin preferences, ceremony timing, or inspiration."
            rows={4}
          />
        </label>
        <input name="slot" type="hidden" value={slot} />
        <button className="submit-button" disabled={submitting} type="submit">
          {submitting ? "Preparing request" : "Reserve Date with Deposit"}
        </button>
        <p className="booking-trust">Your booking is confirmed after successful Razorpay deposit verification.</p>
        {confirmation ? <p className="confirmation">{confirmation}</p> : null}
      </form>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonial-section section-pad">
      <div className="testimonial-heading">
        <div className="section-kicker">Bride notes</div>
        <h2>Loved by Brides, Remembered in Frames</h2>
        <p>Real bridal experiences shaped with patience, precision, and emotional detail.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <figure className="testimonial-card" key={item.name}>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>{item.event}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FeedbackSection() {
  const [rating, setRating] = useState("5");
  const [message, setMessage] = useState<string | null>(null);

  function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("feedbackName") || "Bride");
    setMessage(
      `${name}, thank you. Your ${rating}-star feedback is ready to connect to the studio inbox or review workflow.`,
    );
    event.currentTarget.reset();
    setRating("5");
  }

  return (
    <section className="feedback-section section-pad" id="feedback">
      <div className="feedback-copy">
        <div className="section-kicker">Feedback atelier</div>
        <h2>Let brides leave a polished note after the final look.</h2>
        <p>
          This section captures the feeling of the experience, not just a rating.
          Your note helps future brides understand the care behind the full experience.
        </p>
      </div>
      <form className="feedback-form glass-panel" onSubmit={submitFeedback}>
        <label>
          Bride name
          <input name="feedbackName" placeholder="Your name" required />
        </label>
        <label>
          Event type
          <select name="eventType">
            <option>Wedding ceremony</option>
            <option>Reception</option>
            <option>Engagement</option>
            <option>Party makeup</option>
          </select>
        </label>
        <div className="rating-row" role="radiogroup" aria-label="Feedback rating">
          {["5", "4", "3"].map((value) => (
            <button
              aria-checked={rating === value}
              className={rating === value ? "rating-pill active" : "rating-pill"}
              key={value}
              onClick={() => setRating(value)}
              role="radio"
              type="button"
            >
              {value} stars
            </button>
          ))}
        </div>
        <label>
          Feedback
          <textarea
            name="feedback"
            placeholder="Share what felt beautiful, calm, premium, or memorable."
            required
            rows={5}
          />
        </label>
        <button className="submit-button feedback-submit" type="submit">
          Send feedback
        </button>
        {message ? <p className="confirmation">{message}</p> : null}
      </form>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section section-pad">
      <div>
        <div className="section-kicker">Questions</div>
        <h2>Before You Reserve</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function NilambaryExperience() {
  return (
    <main className="nilambary-site">
      <HeroSection />
      <BeforeAfterSection />
      <ServiceSection />
      <SareeStory />
      <SphereGallery />
      <BookingSection />
      <Testimonials />
      <FeedbackSection />
      <FAQ />
      <footer className="site-footer">
        <div>
          <span>Brides of Nilambary</span>
          <p>Luxury bridal makeup, saree styling, and transformation artistry by Aiswarya.</p>
        </div>
        <div className="footer-links">
          <a href="#services">Explore services</a>
          <a href="/gallery">View gallery</a>
          <a href="/booking">Reserve My Date</a>
          <a href="#feedback">Leave feedback</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contactHref} rel="noreferrer" target="_blank">
            WhatsApp now
          </a>
        </div>
        <p className="footer-note">
          <a href={contact.instagram} rel="noreferrer" target="_blank">Instagram</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Booking terms</a>
        </p>
      </footer>
    </main>
  );
}
