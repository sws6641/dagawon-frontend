"use client";

import * as React from "react";
import { cn } from "./utils";

interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

function Menubar({ className, ...props }: MenubarProps) {
  return (
    <div
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  );
}

function MenubarMenu({ children, className, ...props }: MenubarProps) {
  return (
    <div
      data-slot="menubar-menu"
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function MenubarTrigger({ children, className, ...props }: MenubarProps) {
  return (
function MenubarTrigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-slot="menubar-trigger"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
  );
}

function MenubarContent({ children, className, ...props }: MenubarProps) {
  return (
    <div
      data-slot="menubar-content"
      className={cn(
        "absolute bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function MenubarItem({
  children,
  className,
  ...props
}: MenubarProps) {
  return (
    <div
      data-slot="menubar-item"
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer select-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function MenubarSeparator({ className, ...props }: MenubarProps) {
  return (
    <div
      data-slot="menubar-separator"
      className={cn("h-px bg-border my-1 -mx-1", className)}
      {...props}
    />
  );
}

function MenubarSub({
  children,
  className,
  ...props
}: MenubarProps) {
  return (
    <div data-slot="menubar-sub" className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

type MenubarSubTriggerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

function MenubarSubTrigger({
  children,
  className,
  ...props
}: MenubarSubTriggerProps) {
  return (
    <div
      role="button"
      tabIndex={0} // 키보드 접근성
      data-slot="menubar-sub-trigger"
      className={cn(
        "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
      <span className="ml-2 text-xs">▶</span>
    </div>
  );
}

function MenubarSubContent({ children, className, ...props }: MenubarProps) {
  return (
    <div
      data-slot="menubar-sub-content"
      className={cn(
        "absolute left-full top-0 bg-popover text-popover-foreground min-w-[8rem] rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};