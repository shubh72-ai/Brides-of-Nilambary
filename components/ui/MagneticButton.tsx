"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  children,
  className,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const button = ref.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.setProperty("--magnet-x", `${x * 0.14}px`);
    button.style.setProperty("--magnet-y", `${y * 0.18}px`);
  }

  function resetMagnet() {
    const button = ref.current;
    if (!button) return;
    button.style.setProperty("--magnet-x", "0px");
    button.style.setProperty("--magnet-y", "0px");
  }

  return (
    <Link
      className={cn("magnetic-button", variant, className)}
      href={href}
      onPointerLeave={resetMagnet}
      onPointerMove={handlePointerMove}
      ref={ref}
    >
      <span>{children}</span>
    </Link>
  );
}
