"use client";

import Image from "next/image";
import { serviceCatalog } from "@/lib/constants";
import { formatInr } from "@/lib/utils";

export function ServiceSelector({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="service-selector" role="radiogroup" aria-label="Select bridal service">
      {serviceCatalog.map((service) => (
        <button
          aria-checked={value === service.title}
          className={value === service.title ? "service-option selected" : "service-option"}
          key={service.slug}
          onClick={() => onChange(service.title)}
          role="radio"
          type="button"
        >
          <span className="service-option-media">
            <Image
              alt=""
              fill
              sizes="(max-width: 720px) 42vw, 220px"
              src={service.image}
            />
          </span>
          <span className="service-option-copy">
            <small>{service.category}</small>
            <strong>{service.title}</strong>
            <em>{service.duration} / {formatInr(service.price)}</em>
          </span>
        </button>
      ))}
    </div>
  );
}
