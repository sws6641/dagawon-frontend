"use client";

import * as React from "react";
import { cn } from "./utils";
import { buttonVariants } from "./button";

type AlertDialogProps = React.PropsWithChildren<{}>;

function AlertDialog({ children }: AlertDialogProps) {
  return <div data-slot="alert-dialog">{children}</div>;
}

type AlertDialogTriggerProps = React.PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

function AlertDialogTrigger({ children, className, onClick }: AlertDialogTriggerProps) {
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

type AlertDialogContentProps = React.PropsWithChildren<{
  className?: string;
  open: boolean;
  onClose?: () => void;
}>;

function AlertDialogContent({ children, className, open, onClose }: AlertDialogContentProps) {
  if (!open) return null;

  return (
    <div
      data-slot="alert-dialog-overlay"
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background rounded-lg border p-6 shadow-lg w-full max-w-lg",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function AlertDialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)}>{children}</div>;
}

function AlertDialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}>{children}</div>;
}

function AlertDialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

function AlertDialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

function AlertDialogAction({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button className={cn(buttonVariants(), className)} onClick={onClick}>
      {children}
    </button>
  );
}

function AlertDialogCancel({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button className={cn(buttonVariants({ variant: "outline" }), className)} onClick={onClick}>
      {children}
    </button>
  );
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};