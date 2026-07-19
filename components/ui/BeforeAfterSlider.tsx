"use client";

import Image from "next/image";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { memo, useCallback, useRef, useState } from "react";

type OffsetValue = number | string;

export type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  beforeScale?: number;
  afterScale?: number;
  beforeTranslateX?: OffsetValue;
  afterTranslateX?: OffsetValue;
  beforeTranslateY?: OffsetValue;
  afterTranslateY?: OffsetValue;
};

type SliderVars = CSSProperties & Record<`--${string}`, string | number>;

function clampPosition(value: number) {
  return Math.min(90, Math.max(10, value));
}

function toOffset(value: OffsetValue | undefined) {
  if (typeof value === "number") {
    return `${value}%`;
  }

  return value ?? "0%";
}

export const BeforeAfterSlider = memo(function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  beforeObjectPosition = "50% 50%",
  afterObjectPosition = "50% 50%",
  beforeScale = 1,
  afterScale = 1,
  beforeTranslateX,
  afterTranslateX,
  beforeTranslateY,
  afterTranslateY,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const nextPosition = clampPosition(((clientX - bounds.left) / bounds.width) * 100);
    setPosition((current) => {
      const rounded = Math.round(nextPosition * 10) / 10;
      return Math.abs(current - rounded) < 0.1 ? current : rounded;
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      updateFromClientX(event.clientX);
    },
    [updateFromClientX],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updateFromClientX(event.clientX);
    },
    [isDragging, updateFromClientX],
  );

  const stopDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => clampPosition(current - step));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => clampPosition(current + step));
    }

    if (event.key === "Home") {
      event.preventDefault();
      setPosition(10);
    }

    if (event.key === "End") {
      event.preventDefault();
      setPosition(90);
    }
  }, []);

  const sliderVars: SliderVars = {
    "--before-position": beforeObjectPosition,
    "--after-position": afterObjectPosition,
    "--before-scale": beforeScale,
    "--after-scale": afterScale,
    "--before-translate-x": toOffset(beforeTranslateX),
    "--after-translate-x": toOffset(afterTranslateX),
    "--before-translate-y": toOffset(beforeTranslateY),
    "--after-translate-y": toOffset(afterTranslateY),
    "--reveal-position": `${position}%`,
  };

  return (
    <div className="before-after-slider" style={sliderVars}>
      <div
        aria-label="Compare natural base and bridal finish"
        aria-valuemax={90}
        aria-valuemin={10}
        aria-valuenow={Math.round(position)}
        className={`before-after-stage${isDragging ? " is-dragging" : ""}`}
        onKeyDown={handleKeyDown}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerLeave={isDragging ? stopDragging : undefined}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        ref={stageRef}
        role="slider"
        tabIndex={0}
      >
        <div className="before-after-image-frame">
          <div className="before-after-image-transform before-transform">
            <Image
              alt="Natural bridal base before Brides of Nilambary styling"
              className="before-after-image before-image"
              fill
              loading="lazy"
              sizes="(max-width: 980px) calc(126vw - 45px), 78vw"
              src={beforeImage}
            />
          </div>
        </div>

        <div className="before-after-layer" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <div className="before-after-image-frame">
            <div className="before-after-image-transform after-transform">
              <Image
                alt="Complete bridal finish after Brides of Nilambary styling"
                className="before-after-image after-image"
                fill
                loading="lazy"
                sizes="(max-width: 980px) calc(126vw - 45px), 78vw"
                src={afterImage}
              />
            </div>
          </div>
        </div>

        <span className="before-after-label before-label">{beforeLabel}</span>
        <span className="before-after-label after-label">{afterLabel}</span>

        <div className="before-after-divider" aria-hidden="true" style={{ left: `${position}%` }}>
          <span className="before-after-handle">
            <span className="handle-arrow handle-arrow-left" />
            <span className="handle-dot" />
            <span className="handle-arrow handle-arrow-right" />
          </span>
        </div>
      </div>

      <div className="before-after-control glass-panel">
        <span>Natural Base</span>
        <div className="before-after-control-track-shell">
          <input
            aria-label="Adjust the bridal transformation comparison"
            className="before-after-control-input"
            max="90"
            min="10"
            onChange={(event) => setPosition(Number(event.currentTarget.value))}
            step="0.1"
            type="range"
            value={position}
          />
          <div className="before-after-control-track" aria-hidden="true">
            <span className="before-after-control-fill" style={{ width: `${position}%` }} />
            <span className="before-after-control-thumb" style={{ left: `${position}%` }} />
          </div>
        </div>
        <span>Bridal Finish</span>
      </div>
    </div>
  );
});
