"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BUTTON_VARIANT_CLASSES,
  BUTTON_SIZE_CLASSES,
  type ButtonVariant,
  type ButtonSize,
} from "@/lib/button-variants";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Button with a real ripple micro-interaction (spec: "Button ripple").
 * Ripple is skipped automatically under prefers-reduced-motion since the
 * `ripple` keyframe itself is neutralized globally in globals.css.
 *
 * For styling a non-button element (e.g. a Link) as if it were a Button,
 * use `buttonVariants()` from "@/lib/button-variants" instead of wrapping
 * this component — see that file for why.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onClick, children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        {
          id,
          x: e.clientX - rect.left - size / 2,
          y: e.clientY - rect.top - size / 2,
          size,
        },
      ]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
      onClick?.(e);
    }

    return (
      <button
        ref={ref}
        className={cn(
          "ripple-container inline-flex items-center justify-center rounded-card font-medium transition-all duration-200 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          BUTTON_VARIANT_CLASSES[variant],
          BUTTON_SIZE_CLASSES[size],
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden="true"
            className="pointer-events-none absolute animate-ripple rounded-full bg-white/50"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
      </button>
    );
  },
);
Button.displayName = "Button";
