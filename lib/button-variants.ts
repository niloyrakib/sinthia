import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-600 shadow-soft hover:shadow-soft-lg",
  secondary:
    "bg-secondary text-white hover:bg-secondary-600 shadow-soft hover:shadow-soft-lg",
  outline:
    "border border-border bg-white text-ink hover:border-primary-200 hover:bg-primary-50",
  ghost: "text-ink hover:bg-primary-50 hover:text-primary-700",
};

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 shrink-0",
};

/**
 * Returns the Button's visual classes for use on non-button elements
 * (e.g. `<Link>`), since Button does not implement a Slot/asChild pattern.
 * Nesting a real <button> around an <a> is invalid HTML — use this instead.
 *
 * Deliberately kept in a plain (non "use client") module: components/ui/button.tsx
 * is client-only (it uses useState for the ripple effect), and a Server
 * Component calling a function imported from a "use client" file gets a
 * client-reference placeholder back instead of the real function — that's
 * why this used to crash "buttonVariants is not a function" from Server
 * Components like app/not-found.tsx. Plain functions with no hooks or
 * browser APIs belong outside the client boundary so both sides can use them.
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-card font-medium transition-all duration-200 ease-premium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    BUTTON_VARIANT_CLASSES[variant],
    BUTTON_SIZE_CLASSES[size],
    className,
  );
}
