"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { galleryImages } from "@/lib/constants";

type DragState = {
  rotation: number;
  x: number;
};

const mobileGalleryQuery = "(max-width: 900px)";

export default function ImmersiveGallery() {
  const cards = useMemo(() => galleryImages.slice(0, 14), []);
  const [rotation, setRotation] = useState(0);
  const [dragStart, setDragStart] = useState<DragState | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(mobileGalleryQuery).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileGalleryQuery);
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#immersive-stage") return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("immersive-stage")?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isMobile]);

  useEffect(() => {
    if (dragStart || isMobile) return;
    const timer = window.setInterval(() => {
      setRotation((value) => value - 0.18);
    }, 36);
    return () => window.clearInterval(timer);
  }, [dragStart, isMobile]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ rotation, x: event.clientX });
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragStart) return;
    setRotation(dragStart.rotation + (event.clientX - dragStart.x) * 0.18);
  }

  function endDrag() {
    setDragStart(null);
  }

  if (isMobile) {
    return (
      <div className="mobile-gallery-fallback" id="immersive-stage">
        <span className="section-kicker">Mobile gallery</span>
        <p>The immersive view is replaced with a faster touch-friendly lookbook on this screen.</p>
        <a href="#gallery-grid">Browse All Looks</a>
      </div>
    );
  }

  const angularStep = 360 / cards.length;

  return (
    <section className="immersive-gallery-section" aria-label="Immersive bridal gallery">
      <div className="immersive-copy">
        <span className="section-kicker">Immersive 3D gallery</span>
        <h2>Bridal artistry, viewed in motion.</h2>
        <p>
          Drag or scroll gently to explore makeup, drape, hair, and final-look studies.
          Each card is spaced for a clear, uninterrupted view.
        </p>
        <a className="immersive-exit" href="#gallery-grid">Exit 3D view</a>
      </div>
      <div
        aria-label="Drag to rotate bridal gallery"
        className={dragStart ? "immersive-stage glass-panel is-dragging" : "immersive-stage glass-panel"}
        id="immersive-stage"
        onPointerCancel={endDrag}
        onPointerDown={startDrag}
        onPointerLeave={endDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onWheel={(event) => setRotation((value) => value + event.deltaY * 0.06)}
        role="region"
      >
        <div
          className="cylinder-track"
          style={{ "--gallery-rotation": `${rotation}deg` } as CSSProperties}
        >
          {cards.map((item, index) => {
            const angle = angularStep * index;
            return (
              <figure
                className="cylinder-card"
                key={item.imageUrl}
                style={{ "--card-angle": `${angle}deg` } as CSSProperties}
              >
                <Image
                  alt={`${item.title} by Brides of Nilambary`}
                  height={800}
                  loading="lazy"
                  sizes="22vw"
                  src={item.imageUrl}
                  width={600}
                />
                <figcaption>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <small>{item.tag}</small>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="immersive-orbit-label glass-panel">
          <span>Drag gallery</span>
          <strong>{cards.length} looks</strong>
        </div>
      </div>
    </section>
  );
}
