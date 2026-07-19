"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryImages } from "@/lib/constants";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryLightbox } from "./GalleryLightbox";

export function GalleryGrid() {
  const [filter, setFilter] = useState("All Looks");
  const [selected, setSelected] = useState<(typeof galleryImages)[number] | null>(null);
  const categories = useMemo(
    () => Array.from(new Set(galleryImages.map((item) => item.category))),
    [],
  );
  const filtered =
    filter === "All Looks" ? galleryImages : galleryImages.filter((item) => item.category === filter);

  return (
    <section className="gallery-masonry-section section-pad" id="gallery-grid">
      <div className="gallery-grid-head">
        <div>
          <span className="section-kicker">Masonry lookbook</span>
          <h2>Looks That Live Beyond the Lens</h2>
          <p>Explore bridal finishes, eye details, saree drapes, hair styling, and transformation moments designed for timeless wedding memories.</p>
        </div>
        <GalleryFilters categories={categories} onChange={setFilter} value={filter} />
      </div>

      <div className="masonry-grid">
        {filtered.map((item, index) => (
          <motion.button
            animate={{ opacity: 1, y: 0 }}
            className="masonry-card"
            initial={{ opacity: 0, y: 28 }}
            key={item.imageUrl}
            onClick={() => setSelected(item)}
            transition={{ delay: index * 0.04, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            type="button"
          >
            <Image
              alt={`${item.title} by Brides of Nilambary`}
              height={900}
              loading="lazy"
              sizes="(max-width: 640px) 92vw, (max-width: 900px) 44vw, 24vw"
              src={item.imageUrl}
              width={720}
            />
            <span className="masonry-card-copy">
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <small>{item.tag}</small>
            </span>
          </motion.button>
        ))}
      </div>

      <GalleryLightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
