"use client";

import * as React from "react";
import { cn } from "./utils";

type BadgeProps = React.PropsWithChildren<{
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}>;

function Badge({ children, className, variant = "default", asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? "div" : "span"; // Slot 없이 asChild 지원

  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive:
      "border-transparent bg-destructive text-white hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/50",
    outline: "text-foreground hover:bg-accent hover:text-accent-foreground border border-border",
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus:outline-none transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge };