"use client";

import React from "react";
import { cn } from "./utils";

// context
const DropdownContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownMenu components must be used inside <DropdownMenu>");
  return ctx;
}

type DropdownMenuProps = {
  children: React.ReactNode;
};

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useDropdown();
  return (
    <button
      onClick={() => setOpen(!open)}
      className="px-3 py-1.5 rounded border bg-white shadow-sm text-sm"
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useDropdown();
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute left-0 mt-2 w-48 rounded-md border bg-white shadow-lg p-1 z-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  children,
  className,
  inset,
  onSelect,
  destructive,
}: {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={onSelect}
      className={cn(
        "cursor-pointer px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100",
        inset && "pl-8",
        destructive && "text-red-600 hover:bg-red-50",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuLabel({
  children,
  inset,
}: {
  children: React.ReactNode;
  inset?: boolean;
}) {
  return (
    <div
      className={cn("px-2 py-1.5 text-sm font-medium text-gray-700", inset && "pl-8")}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-200" />;
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};