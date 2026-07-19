"use client";

import Image from "next/image";
import type { galleryImages } from "@/lib/constants";

type GalleryItem = (typeof galleryImages)[number];

export function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={item.title}>
      <button aria-label="Close gallery preview" className="lightbox-close" onClick={onClose} type="button">
        Close
      </button>
      <figure className="lightbox-panel glass-panel">
        <Image
          alt={item.title}
          height={1500}
          sizes="(max-width: 720px) 96vw, 70vw"
          src={item.imageUrl}
          width={1200}
        />
        <figcaption>
          <span>{item.category}</span>
          <strong>{item.title}</strong>
          <p>{item.tag}</p>
        </figcaption>
      </figure>
    </div>
  );
}
