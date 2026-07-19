"use client";

/* eslint-disable @next/next/no-img-element -- Admin previews accept arbitrary user-provided URLs. */

import { useState } from "react";
import { galleryImages } from "@/lib/constants";

export function GalleryManager() {
  const [items, setItems] = useState(galleryImages);

  function addItem(formData: FormData) {
    const title = formData.get("title")?.toString() || "Untitled bridal look";
    const imageUrl = formData.get("imageUrl")?.toString() || "/gallery/image-1.webp";
    const category = formData.get("category")?.toString() || "Makeup";
    const tag = formData.get("tag")?.toString() || "Studio upload";
    setItems((current) => [{ title, imageUrl, category, tag, featured: false, beforeAfterType: "detail" }, ...current]);
  }

  return (
    <div className="manager-grid">
      <form action={addItem} className="manager-form glass-panel">
        <span className="section-kicker">Add image</span>
        <label>
          <span>Image URL</span>
          <input name="imageUrl" placeholder="/gallery/image-9.webp" />
        </label>
        <label>
          <span>Title</span>
          <input name="title" placeholder="Final bridal portrait" />
        </label>
        <label>
          <span>Category</span>
          <input name="category" placeholder="Makeup" />
        </label>
        <label>
          <span>Tag</span>
          <input name="tag" placeholder="Soft gold finish" />
        </label>
        <button className="luxury-button luxury-button-gold" type="submit">
          Add preview image
        </button>
      </form>
      <div className="manager-list">
        {items.map((item) => (
          <article className="manager-card glass-panel" key={`${item.title}-${item.imageUrl}`}>
            <img alt={item.title} decoding="async" loading="lazy" src={item.imageUrl} />
            <div>
              <strong>{item.title}</strong>
              <span>{item.category}</span>
              <button type="button" onClick={() => setItems((current) => current.filter((value) => value.imageUrl !== item.imageUrl))}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
