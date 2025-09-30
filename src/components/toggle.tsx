"use client";

import * as React from "react";
import { cn } from "./utils";

type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  pressed?: boolean;
};

function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed = false,
  ...props
}: ToggleProps) {
  const sizeClasses =
    size === "sm"
      ? "h-8 px-1.5 min-w-8"
      : size === "lg"
      ? "h-10 px-2.5 min-w-10"
      : "h-9 px-2 min-w-9";

  const variantClasses =
    variant === "outline"
      ? "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      : "bg-transparent";

  const pressedClasses = pressed
    ? "bg-accent text-accent-foreground"
    : "hover:bg-muted hover:text-muted-foreground";

  return (
    <button
      data-slot="toggle"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        sizeClasses,
        variantClasses,
        pressedClasses,
        className
      )}
      aria-pressed={pressed}
      {...props}
    />
  );
}

export { Toggle };