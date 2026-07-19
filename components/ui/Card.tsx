import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article className={cn("luxury-card", className)} {...props}>
      {children}
    </article>
  );
}
