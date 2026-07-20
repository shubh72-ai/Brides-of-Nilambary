"use client";

import Image from "next/image";
import { serviceCatalog } from "@/lib/constants";
import { formatInr } from "@/lib/utils";

export function ServiceSelector({
  onChange,
  values,
}: {
  onChange: (values: string[]) => void;
  values: string[];
}) {
  return (
    <div className="service-selector" role="group" aria-label="Select one or more bridal services">
      {serviceCatalog.map((service) => {
        const selected = values.includes(service.title);

        return (
          <button
            aria-pressed={selected}
            className={selected ? "service-option selected" : "service-option"}
            key={service.slug}
            onClick={() =>
              onChange(
                selected
                  ? values.filter((value) => value !== service.title)
                  : [...values, service.title],
              )
            }
            type="button"
          >
            <span className="service-option-check" aria-hidden="true">
              <svg viewBox="0 0 20 20">
                <path d="m5 10 3.1 3.1L15 6.8" />
              </svg>
            </span>
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
        );
      })}
    </div>
  );
}
