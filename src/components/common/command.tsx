"use client";

import * as React from "react";
import { cn } from "./utils";
// import { SearchIcon } from "./icons"; // lucide-react 대체 가능

function Command({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title?: string; description?: string }) {
  return (
    <div
      data-slot="command-dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      {...props}
    >
      <div className="bg-background rounded-md shadow-lg w-full max-w-md">
        <div className="sr-only">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      {/* 아이콘이 없는 상태에서는 빈 span 사용 */}
      <span className="w-4 h-4 opacity-50" />
      <input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-list"
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden scroll-py-1", className)}
      {...props}
    />
  );
}

function CommandEmpty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="command-empty" className={cn("py-6 text-center text-sm", className)} {...props} />
  );
}

function CommandGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-group"
      className={cn("text-foreground overflow-hidden p-1 text-xs font-medium", className)}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="command-separator" className={cn("bg-border h-px -mx-1", className)} {...props} />;
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};