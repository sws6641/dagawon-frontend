"use client";

import * as React from "react";
import { cn } from "./utils";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  className?: string;
};

function Tooltip({
  children,
  content,
  side = "top",
  sideOffset = 8,
  className,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
const timeoutRef = React.useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = window.setTimeout(() => setOpen(false), 100);
  };

  // 위치 계산
  const getPosition = () => {
    switch (side) {
      case "top":
        return `bottom-full mb-${sideOffset}`;
      case "bottom":
        return `top-full mt-${sideOffset}`;
      case "left":
        return `right-full mr-${sideOffset} top-1/2 -translate-y-1/2`;
      case "right":
        return `left-full ml-${sideOffset} top-1/2 -translate-y-1/2`;
      default:
        return "";
    }
  };

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {open && (
        <div
          className={cn(
            "absolute z-50 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-lg animate-fade-in",
            getPosition(),
            className
          )}
        >
          {content}
          {/* 간단한 화살표 */}
          <div
            className={cn(
              "absolute w-2 h-2 bg-primary rotate-45",
              side === "top" && "bottom-[-0.25rem] left-1/2 -translate-x-1/2",
              side === "bottom" && "top-[-0.25rem] left-1/2 -translate-x-1/2",
              side === "left" && "right-[-0.25rem] top-1/2 -translate-y-1/2",
              side === "right" && "left-[-0.25rem] top-1/2 -translate-y-1/2"
            )}
          />
        </div>
      )}
    </div>
  );
}

export { Tooltip };