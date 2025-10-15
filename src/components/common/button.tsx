"use client";

import * as React from "react";
import { cn } from "./utils";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  icon?: React.ReactNode;
  color: "neutral" | "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  className?:string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-white hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/50",
  outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-9 px-4 py-2 gap-2 text-sm",
  sm: "h-8 px-3 gap-1.5 text-sm",
  lg: "h-10 px-6 gap-2 text-base",
  icon: "w-9 h-9 p-2",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "default",
      size = "default",
      asChild = false,
      icon,
        color,
      disabled = false,
      children,
      onClick,
      "aria-label": ariaLabel,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        type={type}
        data-slot="button"
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all outline-none",
          "disabled:pointer-events-none disabled:opacity-50 focus:ring-2 focus:ring-offset-1",
          variantClasses[variant],
          sizeClasses[size],
          color,
          ariaInvalid ? "ring-2 ring-destructive/50 border-destructive" : ""
        )}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel ?? (typeof children === "string" ? children : undefined)}
        aria-invalid={ariaInvalid}
        {...props}
      >
        {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
        <span>{children}</span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };

// Button.tsx 파일 제일 아래쪽에 추가

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-all outline-none",
    "disabled:pointer-events-none disabled:opacity-50 focus:ring-2 focus:ring-offset-1",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}