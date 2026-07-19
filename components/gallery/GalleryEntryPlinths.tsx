"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

const entryCards = [
  {
    eyebrow: "Jewellery / ornament",
    href: "#gallery-grid",
    image: "/gallery/image-7.webp",
    imageAlt: "Detailed bridal eye, bindi, and jewellery styling",
    title: "Explore Style Details",
  },
  {
    eyebrow: "Face / eye / finish",
    href: "#immersive-stage",
    image: "/gallery/image-3.webp",
    imageAlt: "Close bridal eye makeup profile",
    title: "Explore Makeup Profile",
  },
] as const;

export function GalleryEntryPlinths() {
  const reducedMotion = useReducedMotion();

  function openGalleryTarget(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    window.history.pushState(null, "", href);

    const targetId = href.slice(1);
    const findAndScroll = (attempt = 0) => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      if (attempt < 24) {
        window.setTimeout(() => findAndScroll(attempt + 1), 50);
      }
    };

    findAndScroll();
  }

  return (
    <div className="gallery-entry-plinths" aria-label="Gallery entry options">
      {entryCards.map((card, index) => (
        <motion.article
          className="gallery-entry-plinth"
          initial={reducedMotion ? false : { y: 24 }}
          key={card.title}
          transition={{
            delay: index * 0.1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ amount: 0.4, once: true }}
          whileHover={
            reducedMotion
              ? undefined
              : { rotateX: index === 0 ? 1.4 : -1.4, rotateY: index === 0 ? -2 : 2, y: -6 }
          }
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link href={card.href} onClick={(event) => openGalleryTarget(event, card.href)}>
            <div className="gallery-entry-image">
              <Image
                alt={card.imageAlt}
                fill
                sizes="(max-width: 720px) 92vw, 34vw"
                src={card.image}
              />
            </div>
            <div className="gallery-entry-copy">
              <span>{card.eyebrow}</span>
              <strong>{card.title}</strong>
              <small>
                Open lookbook <i aria-hidden="true">+</i>
              </small>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
