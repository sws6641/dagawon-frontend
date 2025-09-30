"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils";

function Popover({ children, ...props }: { children: React.ReactNode }) {
  return (
    <div data-slot="popover" {...props}>
      {children}
    </div>
  );
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button
      type="button"
      data-slot="popover-trigger"
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

function PopoverContent({
  children,
  className,
  align = "center",
  sideOffset = 4,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const [container] = React.useState(() => document.createElement("div"));

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  const popoverStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 50,
    minWidth: 288, // w-72
    borderRadius: 8,
    padding: 16,
    backgroundColor: "var(--popover-bg, white)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    ...style,
  };

  // 실제 정렬 로직은 필요에 따라 구현 가능
  // align과 sideOffset을 이용해 위치 계산 가능

  return createPortal(
    <div
      data-slot="popover-content"
      className={cn("", className)}
      style={popoverStyle}
      {...props}
    >
      {children}
    </div>,
    container
  );
}

function PopoverAnchor({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="popover-anchor" {...props}>
      {children}
    </div>
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };