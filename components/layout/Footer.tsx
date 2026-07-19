import Link from "next/link";
import { contact } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="site-footer section-pad">
      <div>
        <span className="footer-kicker">Bridal artistry by Aiswarya</span>
        <h2>Brides of Nilambary</h2>
      </div>
      <div className="footer-contact">
        <p>
          Luxury bridal makeup, saree styling, and transformation artistry by Aiswarya.
        </p>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={whatsappLink(contact.whatsapp, "Hi Brides of Nilambary, I want to enquire about bridal styling.")}>
            WhatsApp enquiry
          </a>
          <Link href="/booking">Reserve My Date</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Booking terms</Link>
        </div>
      </div>
    </footer>
  );
}
