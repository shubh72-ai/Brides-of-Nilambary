import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Playfair_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brides-of-nilambary.example";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const brandDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brides of Nilambary",
    template: "%s | Brides of Nilambary",
  },
  description:
    "Luxury Indian and Maharashtrian bridal makeup, hairstyling, saree draping, jewellery styling, and cinematic wedding transformations.",
  alternates: { canonical: "/" },
  keywords: [
    "bridal makeup artist",
    "Maharashtrian bridal makeup",
    "bridal hairstyling",
    "saree draping",
    "bridal jewellery styling",
  ],
  openGraph: {
    title: "Brides of Nilambary",
    description:
      "Premium bridal makeup, hairstyling, saree draping, styling, and transformation experiences.",
    images: ["/frames/frame_0240.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/frames/frame_0240.webp"],
    title: "Brides of Nilambary",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${brandDisplay.variable}`}>
        <SmoothScrollProvider>
          {children}
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BeautySalon",
                name: "Brides of Nilambary",
                url: siteUrl,
                telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
                email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
                sameAs: process.env.NEXT_PUBLIC_INSTAGRAM_URL ? [process.env.NEXT_PUBLIC_INSTAGRAM_URL] : undefined,
                makesOffer: [
                  "Bridal makeup",
                  "Maharashtrian bridal styling",
                  "Bridal hairstyling",
                  "Saree draping",
                  "Jewellery styling",
                ],
              }).replace(/</g, "\\u003c"),
            }}
            type="application/ld+json"
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
