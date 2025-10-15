"use client";

import * as React from "react";
import { cn } from "./utils";

interface NavigationMenuProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationMenuItemProps {
  children: React.ReactNode;
  index: number;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  className?: string;
}

export function NavigationMenu({ children, className }: NavigationMenuProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div
      className={cn(
        "relative flex max-w-max items-center justify-center",
        className
      )}
    >
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          index: idx,
          openIndex,
          setOpenIndex,
        });
      })}
    </div>
  );
}

export function NavigationMenuItem({
  children,
  index,
  openIndex,
  setOpenIndex,
  className,
}: NavigationMenuItemProps) {
  const isOpen = openIndex === index;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setOpenIndex(index)}
      onMouseLeave={() => setOpenIndex(null)}
    >
      {children}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[150px] rounded-md border bg-white shadow-md z-50">
          {React.Children.map(children, (child) => child)}
        </div>
      )}
    </div>
  );
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function NavigationMenuTrigger({ children, className }: NavigationMenuTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      {children} <span className="ml-1 text-xs">▼</span>
    </button>
  );
}

interface NavigationMenuLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function NavigationMenuLink({ children, href, className }: NavigationMenuLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "block w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </a>
  );
}