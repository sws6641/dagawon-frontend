"use client";

import * as React from "react";
import { cn } from "./utils";

type HoverCardProps = {
  children: React.ReactNode;
};

function HoverCard({ children }: HoverCardProps) {
  return (
    <div data-slot="hover-card" className="relative inline-block">
      {children}
    </div>
  );
}

type HoverCardTriggerProps = {
  children: React.ReactNode;
};

function HoverCardTrigger({ children }: HoverCardTriggerProps) {
  return (
    <div data-slot="hover-card-trigger" className="cursor-pointer">
      {children}
    </div>
  );
}

type HoverCardContentProps = {
  children: React.ReactNode;
  className?: string;
};

function HoverCardContent({ children, className }: HoverCardContentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={ref}
    >
      {isOpen && (
        <div
          data-slot="hover-card-content"
          className={cn(
            "absolute z-50 w-64 rounded-md border bg-white p-4 shadow-md",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };