"use client";

type RazorpayOptions = {
  amount: number;
  bookingId: string;
  brideName: string;
  contact: string;
  email?: string;
  keyId: string;
  orderId: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, callback: () => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(options: RazorpayOptions) {
  const loaded = await loadRazorpayScript();

  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay checkout could not be loaded.");
  }

  const checkout = new window.Razorpay({
    amount: options.amount,
    currency: "INR",
    description: "Brides of Nilambary booking deposit",
    handler: async (response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => {
      const verification = await fetch("/api/payments/verify", {
        body: JSON.stringify({
          bookingId: options.bookingId,
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (verification.ok) {
        window.location.href = `/booking-success?booking=${encodeURIComponent(options.bookingId)}`;
        return;
      }

      window.location.href = `/booking-cancelled?booking=${encodeURIComponent(options.bookingId)}`;
    },
    key: options.keyId,
    modal: {
      ondismiss: () => {
        window.location.href = `/booking-cancelled?booking=${encodeURIComponent(options.bookingId)}`;
      },
    },
    name: "Brides of Nilambary",
    order_id: options.orderId,
    prefill: {
      contact: options.contact,
      email: options.email,
      name: options.brideName,
    },
    theme: { color: "#D6B36A" },
  });

  checkout.open();
}
