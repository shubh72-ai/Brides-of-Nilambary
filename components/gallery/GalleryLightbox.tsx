"use client";

import Image from "next/image";
import type { galleryData } from "@/src/lib/gallery-data";

type GalleryItem = (typeof galleryData)[number];

export function GalleryLightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={item.displayName}>
      <button aria-label="Close gallery preview" className="lightbox-close" onClick={onClose} type="button">
        Close
      </button>
      <figure className="lightbox-panel glass-panel">
        <Image
          alt={item.altText}
          height={2048}
          sizes="(max-width: 720px) 96vw, 70vw"
          src={item.image9x16}
          width={1152}
        />
        <figcaption>
          <span>{item.category}</span>
          <strong>{item.displayName}</strong>
          <p>{item.tag}</p>
        </figcaption>
      </figure>
    </div>
  );
}
