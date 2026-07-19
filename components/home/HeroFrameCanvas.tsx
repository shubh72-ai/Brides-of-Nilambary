"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroFrameCanvasProps = {
  fallbackImage: string;
  fileExtension?: string;
  framePathPrefix?: string;
  totalFrames: number;
};

const INITIAL_FRAME_BATCH = 16;
const FRAME_CACHE_LIMIT = 72;
const PENDING_FRAME_LIMIT = 24;
const MOBILE_MEDIA_QUERY = "(max-width: 820px)";

function clampFrame(frame: number, totalFrames: number) {
  return Math.min(totalFrames, Math.max(1, frame));
}

function getFrameSource(prefix: string, frame: number, extension: string) {
  const normalizedExtension = extension.replace(/^\./, "");
  return `${prefix}${String(frame).padStart(4, "0")}.${normalizedExtension}`;
}

export function HeroFrameCanvas({
  fallbackImage,
  fileExtension = "webp",
  framePathPrefix = "/hero-frames/frame_",
  totalFrames,
}: HeroFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>("[data-hero-sequence]");
    if (!canvas || !section || totalFrames < 1) return;

    const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mobileQuery.matches || reducedMotionQuery.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const loadedFrames = new Map<number, HTMLImageElement>();
    const pendingFrames = new Map<number, HTMLImageElement>();
    const failedFrames = new Set<number>();
    let animationFrame = 0;
    let anchorTimer = 0;
    let currentFrame = 1;
    let active = true;

    const findNearestLoadedFrame = (frame: number) => {
      const exactFrame = loadedFrames.get(frame);
      if (exactFrame) return exactFrame;

      for (let distance = 1; distance < totalFrames; distance += 1) {
        const before = loadedFrames.get(frame - distance);
        if (before) return before;
        const after = loadedFrames.get(frame + distance);
        if (after) return after;
      }

      return undefined;
    };

    const pruneFrameCache = (centerFrame: number) => {
      if (loadedFrames.size <= FRAME_CACHE_LIMIT) return;

      const removableFrames = [...loadedFrames.keys()]
        .filter((frame) => frame !== 1 && frame !== centerFrame)
        .sort(
          (left, right) =>
            Math.abs(right - centerFrame) - Math.abs(left - centerFrame),
        );

      while (loadedFrames.size > FRAME_CACHE_LIMIT && removableFrames.length) {
        const frame = removableFrames.shift();
        if (frame !== undefined) loadedFrames.delete(frame);
      }
    };

    const drawFrame = (frame: number) => {
      const image = findNearestLoadedFrame(frame);
      if (!image || !image.naturalWidth || !image.naturalHeight) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const renderWidth = Math.max(1, Math.round(width * pixelRatio));
      const renderHeight = Math.max(1, Math.round(height * pixelRatio));

      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const coverScale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * coverScale;
      const drawHeight = image.naturalHeight * coverScale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      canvas.classList.add("is-ready");
    };

    const loadFrame = (frame: number, highPriority = false) => {
      const safeFrame = clampFrame(frame, totalFrames);
      if (
        loadedFrames.has(safeFrame) ||
        pendingFrames.has(safeFrame) ||
        failedFrames.has(safeFrame) ||
        (!highPriority && pendingFrames.size >= PENDING_FRAME_LIMIT)
      ) {
        return;
      }

      const image = new window.Image();
      image.decoding = "async";
      image.fetchPriority = highPriority ? "high" : "low";
      pendingFrames.set(safeFrame, image);

      image.onload = () => {
        pendingFrames.delete(safeFrame);
        if (!active) return;
        loadedFrames.set(safeFrame, image);
        pruneFrameCache(currentFrame);

        if (safeFrame === currentFrame || !canvas.classList.contains("is-ready")) {
          drawFrame(currentFrame);
        }
      };

      image.onerror = () => {
        pendingFrames.delete(safeFrame);
        failedFrames.add(safeFrame);
        if (active && safeFrame === currentFrame) drawFrame(currentFrame);
      };

      image.src = getFrameSource(framePathPrefix, safeFrame, fileExtension);
    };

    const queueNearbyFrames = (frame: number, direction: number) => {
      const nearbyOffsets = [1, 2, 3, 4, 6, 8, 12, 18, 26];
      for (const offset of nearbyOffsets) {
        loadFrame(frame + offset * direction);
        loadFrame(frame - offset * direction);
      }
    };

    const updateFromScroll = () => {
      animationFrame = 0;
      const sectionRect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -sectionRect.top / scrollDistance));
      const nextFrame = clampFrame(
        1 + Math.round(progress * (totalFrames - 1)),
        totalFrames,
      );
      const direction = nextFrame >= currentFrame ? 1 : -1;

      currentFrame = nextFrame;
      section.style.setProperty("--hero-scroll-progress", progress.toFixed(4));
      section.dataset.heroFrame = String(currentFrame);

      loadFrame(currentFrame, true);
      queueNearbyFrames(currentFrame, direction);
      drawFrame(currentFrame);
      pruneFrameCache(currentFrame);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateFromScroll);
    };

    loadFrame(1, true);
    for (let frame = 2; frame <= Math.min(INITIAL_FRAME_BATCH, totalFrames); frame += 1) {
      loadFrame(frame);
    }

    anchorTimer = window.setTimeout(() => {
      [0.25, 0.5, 0.75, 1].forEach((progress) => {
        loadFrame(1 + Math.round(progress * (totalFrames - 1)));
      });
    }, 1200);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(canvas);
    scheduleUpdate();

    return () => {
      active = false;
      window.clearTimeout(anchorTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
      section.style.removeProperty("--hero-scroll-progress");
      delete section.dataset.heroFrame;
      pendingFrames.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      pendingFrames.clear();
      loadedFrames.clear();
      failedFrames.clear();
    };
  }, [fileExtension, framePathPrefix, totalFrames]);

  return (
    <div className="hero-frame-media" aria-hidden="true">
      <div className="hero-frame-fallback">
        <Image
          alt=""
          fill
          priority
          sizes="100vw"
          src={fallbackImage}
          unoptimized
        />
      </div>
      <canvas className="hero-frame-canvas" ref={canvasRef} />
    </div>
  );
}
