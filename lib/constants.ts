import { galleryData } from "@/src/lib/gallery-data";

const configuredDepositAmount = Number(process.env.NEXT_PUBLIC_BOOKING_DEPOSIT_AMOUNT);

export const brand = {
  name: "Brides of Nilambary",
  shortName: "Brides of Nilambary",
  tagline: "Luxury Indian bridal makeup and styling",
  headline: "Bridal Glow, Crafted Like Royal Art",
  subheadline:
    "Premium bridal makeup, saree styling, and transformation experiences designed for your once-in-a-lifetime moment.",
  depositAmount:
    Number.isFinite(configuredDepositAmount) && configuredDepositAmount > 0
      ? Math.round(configuredDepositAmount)
      : 10000,
  currency: "INR",
};

export const contact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@bridesofnilambary.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
};

export const palette = {
  bridalBlack: "#120A0D",
  richMaroon: "#5A1018",
  royalRed: "#8B1E2D",
  champagneGold: "#D6B36A",
  softIvory: "#FFF8EF",
  blushNude: "#E9C7B8",
  warmBrown: "#5B3A2E",
  mutedBeige: "#BFA58A",
};

export const serviceCatalog = [
  {
    title: "Bridal Hairstyling",
    slug: "bridal-hairstyling",
    category: "Hair",
    price: 7500,
    duration: "1.5 hr",
    image: "/services/16x9/03-bridal-hairstyling.jpg",
    description:
      "Elegant bridal buns, floral gajra styling, soft curls, accessories, and camera-ready finishing for the complete wedding look.",
  },
  {
    title: "Premium Bridal Makeup",
    slug: "premium-bridal-makeup",
    category: "Makeup",
    price: 35000,
    duration: "4 hr",
    image: "/services/16x9/01-premium-bridal-makeup.jpg",
    description:
      "Camera-ready skin, sculpted eyes, long-wear finish, and veil-safe touch-up planning for the wedding morning.",
  },
  {
    title: "Airbrush Bridal Makeup",
    slug: "airbrush-bridal-makeup",
    category: "Makeup",
    price: 45000,
    duration: "4.5 hr",
    image: "/frames/frame_0068.webp",
    description:
      "A refined airbrush base with luminous dimension for brides who want an ultra-smooth, editorial finish.",
  },
  {
    title: "Engagement Makeup",
    slug: "engagement-makeup",
    category: "Occasion",
    price: 18000,
    duration: "2.5 hr",
    image: "/frames/frame_0124.webp",
    description:
      "Soft glam, polished hair direction, and jewellery balance for ring ceremonies and intimate portraits.",
  },
  {
    title: "Party Makeup",
    slug: "party-makeup",
    category: "Occasion",
    price: 9500,
    duration: "1.5 hr",
    image: "/frames/frame_0176.webp",
    description:
      "Elegant evening makeup for wedding guests, family events, receptions, and festive celebrations.",
  },
  {
    title: "Maharashtrian Bridal Look",
    slug: "maharashtrian-bridal-look",
    category: "Signature",
    price: 42000,
    duration: "4 hr",
    image: "/frames/frame_0228.webp",
    description:
      "Nath, mundavalya, saree styling, jewellery placement, and makeup composed into a regal Maharashtrian look.",
  },
  {
    title: "Saree Draping & Binding",
    slug: "saree-draping",
    category: "Styling",
    price: 8500,
    duration: "1 hr",
    image: "/services/16x9/02-saree-draping-binding.jpg",
    description:
      "Clean pleats, pre-pleated box folding, ritual-ready structure, veil setting, and movement-tested drapes for ceremonies and portraits.",
  },
  {
    title: "Saree Binding",
    slug: "saree-binding",
    category: "Styling",
    price: 6500,
    duration: "45 min",
    image: "/frames/frame_0332.webp",
    description:
      "Secure bridal binding and fall control so the drape stays comfortable through long wedding rituals.",
  },
  {
    title: "Bridal Jewellery Styling",
    slug: "bridal-jewellery-styling",
    category: "Styling",
    price: 12000,
    duration: "1 hr",
    image: "/frames/frame_0388.webp",
    description:
      "Neckline, hair, veil, and jewellery weight balanced so every angle feels composed and luxurious.",
  },
];

export const galleryImages = galleryData.map((item) => ({
  title: item.displayName,
  category: item.category,
  tag: item.tag,
  imageUrl: item.image16x9,
  featured: item.featured,
  beforeAfterType:
    item.slug === "natural-base"
      ? "before"
      : item.category === "Final Look" || item.category === "Maharashtrian Bridal"
        ? "after"
        : "detail",
}));

export const timeSlots = ["6:00 AM", "8:30 AM", "11:00 AM", "2:30 PM", "5:00 PM"];

export const testimonials = [
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

export const faqs = [
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
    a: "Deposit terms should be confirmed by the studio before payment. The current site is wired as a Razorpay-ready preview.",
  },
];

export const adminStats = [
  { label: "Total bookings", value: "128", detail: "all captured enquiries" },
  { label: "Confirmed bookings", value: "42", detail: "paid or approved" },
  { label: "Pending payments", value: "17", detail: "deposit handoffs" },
  { label: "Gallery images", value: String(galleryImages.length), detail: "published looks" },
];
