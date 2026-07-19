export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

export function normalizePhoneForTel(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappLink(number: string, message: string) {
  const normalized = number.replace(/[^\d]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function createBookingReference() {
  return `NIL-${Date.now().toString(36).toUpperCase()}`;
}
