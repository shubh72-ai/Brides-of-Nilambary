"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews accept arbitrary user-provided URLs. */

import { useState } from "react";
import { serviceCatalog } from "@/lib/constants";
import { formatInr } from "@/lib/utils";

export function ServicesManager() {
  const [items, setItems] = useState(serviceCatalog);

  function addService(formData: FormData) {
    const title = formData.get("title")?.toString() || "New bridal service";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setItems((current) => [
      {
        active: true,
        category: formData.get("category")?.toString() || "Makeup",
        description: formData.get("description")?.toString() || "Replace this with the final service description.",
        duration: formData.get("duration")?.toString() || "2 hr",
        image: formData.get("image")?.toString() || "/frames/frame_0036.webp",
        price: Number(formData.get("price") || 0),
        slug,
        title,
      },
      ...current,
    ]);
  }

  return (
    <div className="manager-grid">
      <form action={addService} className="manager-form glass-panel">
        <span className="section-kicker">Add service</span>
        <label>
          <span>Title</span>
          <input name="title" placeholder="Luxury bridal touch-up" />
        </label>
        <label>
          <span>Category</span>
          <input name="category" placeholder="Makeup" />
        </label>
        <label>
          <span>Price</span>
          <input name="price" placeholder="15000" type="number" />
        </label>
        <label>
          <span>Duration</span>
          <input name="duration" placeholder="2 hr" />
        </label>
        <label>
          <span>Image</span>
          <input name="image" placeholder="/frames/frame_0036.webp" />
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" placeholder="Describe the service." />
        </label>
        <button className="luxury-button luxury-button-gold" type="submit">
          Add preview service
        </button>
      </form>
      <div className="manager-list">
        {items.map((item) => (
          <article className="manager-card glass-panel" key={item.slug}>
            <img alt={item.title} decoding="async" loading="lazy" src={item.image} />
            <div>
              <strong>{item.title}</strong>
              <span>
                {item.duration} / {formatInr(item.price)}
              </span>
              <button type="button" onClick={() => setItems((current) => current.filter((value) => value.slug !== item.slug))}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
