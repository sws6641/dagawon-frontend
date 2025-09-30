"use client";

import * as React from "react";
import { cn } from "./utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  icon?: React.ReactNode; // 버튼 안에 아이콘 삽입
  "aria-invalid"?: boolean;
};

const variantClasses: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/50",
  outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses: Record<string, string> = {
  default: "h-9 px-4 py-2 gap-2",
  sm: "h-8 px-3 gap-1.5 text-sm",
  lg: "h-10 px-6 gap-2 text-base",
  icon: "w-9 h-9 p-2",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, icon, "aria-invalid": ariaInvalid, disabled, children, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        data-slot="button"
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1",
          variantClasses[variant],
          sizeClasses[size],
          ariaInvalid ? "ring-2 ring-destructive/50 border-destructive" : "",
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        {...props}
      >
        {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };