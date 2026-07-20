"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

const beforeAfterImageConfig = {
  beforeImage: "/frames/frame_0001.webp",
  afterImage: "/frames/frame_0240.webp",
  beforeLabel: "Natural Base",
  afterLabel: "Bridal Finish",
  beforeScale: 0.76,
  afterScale: 0.92,
  beforeTranslateX: 1.5,
  afterTranslateX: 0,
  beforeTranslateY: 0,
  afterTranslateY: 5,
  beforeObjectPosition: "center center",
  afterObjectPosition: "center center",
};

export function BeforeAfterSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="transformation-section section-pad" id="transformations">
      <div className="section-kicker">Transformation study</div>
      <div className="split-heading transformation-heading">
        <h2>Transformation that you can feel</h2>
        <p>
          From natural elegance to a complete bridal finish, every detail is crafted
          to photograph beautifully.
        </p>
      </div>

      <div className="compare-shell">
        <BeforeAfterSlider {...beforeAfterImageConfig} />

        <motion.aside
          className="why-brides-module"
          initial={reducedMotion ? false : { opacity: 0, x: 28 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.24, once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="why-brides-panel why-brides-label-panel">
            <span className="eyebrow">Why Brides Book</span>
            <i className="why-brides-ornament" aria-hidden="true" />
          </div>

          <div className="why-brides-panel why-brides-copy-panel">
            <h3>Makeup, drape, and jewellery in perfect harmony.</h3>
            <p>
              Every appointment is planned around your face, neckline, fabric,
              jewellery weight, and camera presence &mdash; so your bridal look feels
              luxurious in person and flawless in every frame.
            </p>
          </div>

          <motion.figure
            animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
            className="why-brides-panel why-brides-preview-panel"
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              alt="Maharashtrian bridal transformation preview"
              fill
              sizes="(max-width: 980px) 42vw, 220px"
              src="/gallery/image-14.webp"
            />
            <figcaption>
              <span>Signature study</span>
              <strong>Maharashtrian finish</strong>
            </figcaption>
          </motion.figure>
        </motion.aside>
      </div>
    </section>
  );
}
