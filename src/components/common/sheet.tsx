"use client";

import * as React from "react";
import { cn } from "./utils";

type SheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
};

function Sheet({ open = false, onOpenChange, side = "right", children }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
      />
      <div
        className={cn(
          "bg-white shadow-lg flex flex-col gap-4 z-50 transition-transform",
          side === "right" && "fixed right-0 top-0 h-full w-3/4 max-w-sm",
          side === "left" && "fixed left-0 top-0 h-full w-3/4 max-w-sm",
          side === "top" && "fixed top-0 left-0 w-full h-auto border-b",
          side === "bottom" && "fixed bottom-0 left-0 w-full h-auto border-t"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function SheetHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-4", className)} {...props}>
      {children}
    </div>
  );
}

function SheetFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props}>
      {children}
    </div>
  );
}

function SheetTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-foreground font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}

function SheetDescription({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
}

function SheetCloseButton({ onClick, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-4 right-4 rounded p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      ✕
      <span className="sr-only">Close</span>
    </button>
  );
}

export {
  Sheet,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetCloseButton
};