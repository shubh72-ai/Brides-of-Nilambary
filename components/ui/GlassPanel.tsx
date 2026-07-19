import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div className={cn("glass-panel", className)} {...props}>
      {children}
    </div>
  );
}
