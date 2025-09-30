"use client";

import * as React from "react";
import { cn } from "./utils";

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

function Accordion({ children, ...props }: AccordionProps) {
  return (
    <div data-slot="accordion" {...props}>
      {children}
    </div>
  );
}

type AccordionItemProps = React.PropsWithChildren<{
  className?: string;
}>;

function AccordionItem({ children, className }: AccordionItemProps) {
  return (
    <div
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
    >
      {children}
    </div>
  );
}

type AccordionTriggerProps = React.PropsWithChildren<{
  className?: string;
}>;

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        data-slot="accordion-trigger"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {children}
        {/* CSS 삼각형 화살표 */}
        <span
          className={cn(
            "w-3 h-3 border-r-2 border-b-2 border-current inline-block transition-transform duration-200",
            open ? "rotate-45" : "-rotate-45"
          )}
        />
      </button>
      <AccordionContent open={open}>{children}</AccordionContent>
    </div>
  );
}

type AccordionContentProps = React.PropsWithChildren<{
  className?: string;
  open?: boolean;
}>;

function AccordionContent({ children, className, open = false }: AccordionContentProps) {
  return (
    <div
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm transition-all duration-300",
        open ? "max-h-96 pt-2 pb-4" : "max-h-0"
      )}
    >
      <div className={cn(className)}>{children}</div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };