"use client";

import * as React from "react";
import { cn } from "./utils";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        data-slot="scroll-area-viewport"
        className="overflow-auto focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </div>
  );
}

function ScrollBar({ orientation = "vertical", className, ...props }: ScrollBarProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      data-slot="scroll-area-scrollbar"
      className={cn(
        "absolute flex touch-none select-none p-px transition-colors",
        isVertical
          ? "top-0 right-0 h-full w-2.5 border-l border-l-transparent"
          : "bottom-0 left-0 h-2.5 w-full flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <div
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </div>
  );
}

export { ScrollArea, ScrollBar };