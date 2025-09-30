"use client";

import React from "react";
import { cn } from "./utils";

type DrawerContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  direction: "left" | "right" | "top" | "bottom";
};

const DrawerContext = React.createContext<DrawerContextType | null>(null);

function useDrawerContext() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer components must be used within <Drawer>");
  return ctx;
}

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  direction?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
};

function Drawer({ open, onOpenChange, direction = "bottom", children }: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ open, onOpenChange, direction }}>
      {children}
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ children }: { children: React.ReactNode }) {
  const { open, onOpenChange } = useDrawerContext();
  return (
    <button onClick={() => onOpenChange(!open)}>{children}</button>
  );
}

function DrawerOverlay({ className }: { className?: string }) {
  const { open, onOpenChange } = useDrawerContext();
  if (!open) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/50 transition-opacity animate-fadeIn",
        className,
      )}
      onClick={() => onOpenChange(false)}
    />
  );
}

function DrawerContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open, onOpenChange, direction } = useDrawerContext();
  if (!open) return null;

  const positionClasses: Record<string, string> = {
    bottom: "bottom-0 inset-x-0 max-h-[80vh] rounded-t-lg border-t",
    top: "top-0 inset-x-0 max-h-[80vh] rounded-b-lg border-b",
    left: "left-0 inset-y-0 w-3/4 sm:max-w-sm rounded-r-lg border-r",
    right: "right-0 inset-y-0 w-3/4 sm:max-w-sm rounded-l-lg border-l",
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <DrawerOverlay />
      <div
        className={cn(
          "fixed z-50 bg-white shadow-lg transition-transform duration-300",
          positionClasses[direction],
          className,
        )}
      >
        {/* drag handle for bottom drawer */}
        {direction === "bottom" && (
          <div className="mx-auto mt-2 mb-2 h-1 w-12 rounded-full bg-gray-300" />
        )}
        {children}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};