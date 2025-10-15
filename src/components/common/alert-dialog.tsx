"use client";

import * as React from "react";
import { cn } from "./utils";
import { buttonVariants } from "./button";

type AlertDialogProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export function AlertDialog({ open, onClose, children }: AlertDialogProps) {
  if (!open) return null;

  return (
    <div
      data-slot="alert-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg border p-6 shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogTrigger({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      data-slot="alert-dialog-trigger"
      className={cn(buttonVariants(), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function AlertDialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)}>{children}</div>;
}

export function AlertDialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}>{children}</div>;
}

export function AlertDialogTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function AlertDialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

export function AlertDialogAction({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button className={cn(buttonVariants(), className)} onClick={onClick}>
      {children}
    </button>
  );
}

export function AlertDialogCancel({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(buttonVariants({ variant: "outline" }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}