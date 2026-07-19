"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { brand, serviceCatalog, timeSlots } from "@/lib/constants";
import { formatInr } from "@/lib/utils";
import { DateTimeSelector } from "./DateTimeSelector";
import { openRazorpayCheckout } from "./RazorpayCheckout";
import { ServiceSelector } from "./ServiceSelector";

const bookingSchema = z.object({
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  eventDate: z.string().min(1, "Choose the wedding date"),
  eventLocation: z.string().min(2, "Add the venue or city"),
  eventTime: z.string().min(1, "Choose an appointment time"),
  name: z.string().min(2, "Enter the bride name"),
  notes: z.string().optional(),
  phone: z.string().min(8, "Enter a reachable phone number"),
  referenceImages: z.array(z.string()).optional(),
  service: z.string().min(2, "Choose a service"),
});

type BookingValues = z.infer<typeof bookingSchema>;

const bookingSteps = [
  { label: "Date", title: "Select date" },
  { label: "Service", title: "Select service" },
  { label: "Details", title: "Bride details" },
  { label: "Review", title: "Review booking" },
  { label: "Deposit", title: "Pay deposit" },
] as const;

const validationFields: Record<number, Array<keyof BookingValues>> = {
  1: ["eventDate", "eventTime"],
  2: ["service"],
  3: ["name", "phone", "email", "eventLocation"],
};

function formatBookingDate(value: string) {
  if (!value) return "Not selected";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm<BookingValues>({
    defaultValues: {
      email: "",
      eventDate: "",
      eventLocation: "",
      eventTime: timeSlots[1],
      name: "",
      notes: "",
      phone: "",
      referenceImages: [],
      service: serviceCatalog[0].title,
    },
    resolver: zodResolver(bookingSchema),
  });

  const values = useWatch({ control });
  const selectedServiceDetail = serviceCatalog.find(
    (service) => service.title === values.service,
  );

  async function advanceStep() {
    const fields = validationFields[step];
    const valid = fields ? await trigger(fields, { shouldFocus: true }) : true;
    if (!valid) return;
    setStep((current) => Math.min(5, current + 1));
  }

  function returnToPreviousStep() {
    setStatus("idle");
    setMessage("");
    setStep((current) => Math.max(1, current - 1));
  }

  async function submit(valuesToSubmit: BookingValues) {
    setStatus("submitting");
    setMessage("");

    try {
      const bookingResponse = await fetch("/api/bookings", {
        body: JSON.stringify(valuesToSubmit),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!bookingResponse.ok) {
        const detail = await bookingResponse.json();
        throw new Error(detail.error || "Booking could not be captured.");
      }

      const booking = await bookingResponse.json();
      const orderResponse = await fetch("/api/payments/create-order", {
        body: JSON.stringify({ bookingId: booking.bookingId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!orderResponse.ok) {
        const detail = await orderResponse.json();
        throw new Error(detail.error || "Payment order could not be created.");
      }

      const order = await orderResponse.json();

      if (!order.configured || !order.order) {
        window.location.assign(
          `/booking-success?booking=${encodeURIComponent(booking.bookingId)}&preview=1`,
        );
        return;
      }

      setStatus("ready");
      setMessage("Opening secure Razorpay checkout.");
      await openRazorpayCheckout({
        amount: order.order.amount,
        bookingId: booking.bookingId,
        brideName: valuesToSubmit.name,
        contact: valuesToSubmit.phone,
        email: valuesToSubmit.email,
        keyId: order.keyId,
        orderId: order.order.id,
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="booking-form booking-page-form" onSubmit={handleSubmit(submit)}>
      <div className="booking-form-head">
        <span className="section-kicker">Private booking ritual</span>
        <h2>Five quiet steps to your date.</h2>
        <p>
          Your {formatInr(brand.depositAmount)} deposit is charged only after you
          review every detail.
        </p>
      </div>

      <ol className="booking-stepper" aria-label="Booking progress">
        {bookingSteps.map((item, index) => {
          const stepNumber = index + 1;
          const reached = stepNumber <= step;
          return (
            <li className={reached ? "reached" : ""} key={item.label}>
              <button
                aria-current={stepNumber === step ? "step" : undefined}
                aria-label={`${item.title}, step ${stepNumber} of ${bookingSteps.length}`}
                disabled={stepNumber >= step}
                onClick={() => setStep(stepNumber)}
                type="button"
              >
                <span>{String(stepNumber).padStart(2, "0")}</span>
                <small>{item.label}</small>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="booking-step-panel" key={step}>
        {step === 1 ? (
          <section aria-labelledby="booking-step-date">
            <div className="booking-step-heading">
              <span>Step 01</span>
              <h3 id="booking-step-date">Choose the wedding date and preparation time.</h3>
              <p>Select the date first, then choose the morning or afternoon slot that suits your rituals.</p>
            </div>
            <DateTimeSelector
              date={values.eventDate}
              onDateChange={(value) =>
                setValue("eventDate", value, { shouldDirty: true, shouldValidate: true })
              }
              onSlotChange={(value) =>
                setValue("eventTime", value, { shouldDirty: true, shouldValidate: true })
              }
              slot={values.eventTime}
            />
            {errors.eventDate ? <small className="form-error">{errors.eventDate.message}</small> : null}
            {errors.eventTime ? <small className="form-error">{errors.eventTime.message}</small> : null}
          </section>
        ) : null}

        {step === 2 ? (
          <section aria-labelledby="booking-step-service">
            <div className="booking-step-heading">
              <span>Step 02</span>
              <h3 id="booking-step-service">Choose the artistry for your day.</h3>
              <p>Each service can be refined with draping, jewellery, hair, and timeline details during consultation.</p>
            </div>
            <ServiceSelector
              onChange={(value) =>
                setValue("service", value, { shouldDirty: true, shouldValidate: true })
              }
              value={values.service}
            />
            {errors.service ? <small className="form-error">{errors.service.message}</small> : null}
          </section>
        ) : null}

        {step === 3 ? (
          <section aria-labelledby="booking-step-details">
            <div className="booking-step-heading">
              <span>Step 03</span>
              <h3 id="booking-step-details">Tell us about the bride and celebration.</h3>
              <p>These details help Aiswarya prepare the right service, timing, and consultation notes.</p>
            </div>
            <div className="field-grid two">
              <label>
                <span>Bride name</span>
                <input autoComplete="name" placeholder="Your full name" {...register("name")} />
                {errors.name ? <small>{errors.name.message}</small> : null}
              </label>
              <label>
                <span>Phone</span>
                <input autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" {...register("phone")} />
                {errors.phone ? <small>{errors.phone.message}</small> : null}
              </label>
            </div>

            <div className="field-grid two">
              <label>
                <span>Email</span>
                <input autoComplete="email" placeholder="you@example.com" type="email" {...register("email")} />
                {errors.email ? <small>{errors.email.message}</small> : null}
              </label>
              <label>
                <span>Venue or city</span>
                <input placeholder="Wedding location" {...register("eventLocation")} />
                {errors.eventLocation ? <small>{errors.eventLocation.message}</small> : null}
              </label>
            </div>

            <label>
              <span>Reference images</span>
              <input
                accept="image/*"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? []).map((file) => file.name);
                  setValue("referenceImages", files, { shouldDirty: true });
                }}
                type="file"
              />
            </label>

            <label>
              <span>Notes</span>
              <textarea
                placeholder="Tell us about the saree, jewellery, rituals, timing, and dream finish."
                {...register("notes")}
              />
            </label>
          </section>
        ) : null}

        {step === 4 ? (
          <section aria-labelledby="booking-step-review">
            <div className="booking-step-heading">
              <span>Step 04</span>
              <h3 id="booking-step-review">Review the bridal plan before payment.</h3>
              <p>Return to any earlier step if a detail needs adjusting.</p>
            </div>
            <dl className="booking-review-grid">
              <div><dt>Bride</dt><dd>{values.name}</dd></div>
              <div><dt>Date</dt><dd>{formatBookingDate(values.eventDate)}</dd></div>
              <div><dt>Time</dt><dd>{values.eventTime}</dd></div>
              <div><dt>Service</dt><dd>{values.service}</dd></div>
              <div><dt>Location</dt><dd>{values.eventLocation}</dd></div>
              <div><dt>Contact</dt><dd>{values.phone}</dd></div>
            </dl>
            {values.notes ? <p className="booking-review-note"><strong>Notes</strong>{values.notes}</p> : null}
          </section>
        ) : null}

        {step === 5 ? (
          <section className="booking-payment-stage" aria-labelledby="booking-step-payment">
            <div className="booking-step-heading">
              <span>Step 05</span>
              <h3 id="booking-step-payment">Secure the date with your deposit.</h3>
              <p>Razorpay opens after the booking record is created and the server confirms the trusted deposit amount.</p>
            </div>
            <div className="booking-deposit-summary">
              <span>Booking deposit</span>
              <strong>{formatInr(brand.depositAmount)}</strong>
              <small>{selectedServiceDetail?.title ?? values.service}</small>
            </div>
            <p className="booking-trust">Your booking is confirmed after successful Razorpay deposit verification.</p>
          </section>
        ) : null}
      </div>

      <div className="booking-step-actions">
        {step > 1 ? (
          <button className="booking-back-button" onClick={returnToPreviousStep} type="button">
            Back
          </button>
        ) : <span />}
        {step < 5 ? (
          <button className="magnetic-button primary booking-next-button" onClick={advanceStep} type="button">
            <span>Continue to {bookingSteps[step].label}</span>
          </button>
        ) : (
          <button
            className="magnetic-button primary booking-submit booking-payment-button"
            disabled={status === "submitting"}
            type="submit"
          >
            <span className="booking-seal-mark" aria-hidden="true">N</span>
            <span>{status === "submitting" ? "Preparing secure checkout" : `Pay ${formatInr(brand.depositAmount)} Deposit`}</span>
          </button>
        )}
      </div>

      {message ? <p className={`booking-message ${status}`}>{message}</p> : null}
    </form>
  );
}
