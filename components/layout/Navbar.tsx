import Link from "next/link";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { brand, contact } from "@/lib/constants";
import { normalizePhoneForTel, whatsappLink } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Booking" },
];

export function Navbar() {
  return (
    <nav aria-label="Primary navigation" className="inner-page-nav">
      <Link className="brand-mark brand-lockup" href="/" aria-label={`${brand.name} home`}>
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
          aria-label={`Send a WhatsApp enquiry to ${brand.name}`}
          className="nav-cta"
          href={whatsappLink(contact.whatsapp, "Hi Brides of Nilambary, I want to enquire about bridal styling.")}
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp enquiry
        </a>
        <a aria-label={`Call ${brand.name}`} className="nav-cta" href={normalizePhoneForTel(contact.phone)}>
          Call us
        </a>
        <Link className="nav-cta" href="/booking">
          Reserve My Date
        </Link>
      </div>
    </nav>
  );
}
