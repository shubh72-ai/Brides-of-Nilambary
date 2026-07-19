"use client";

import dynamic from "next/dynamic";

const ImmersiveGallery = dynamic(() => import("./ImmersiveGallery"), {
  loading: () => <div className="immersive-loading glass-panel">Preparing the immersive gallery.</div>,
  ssr: false,
});

export function ImmersiveGalleryLoader() {
  return <ImmersiveGallery />;
}
