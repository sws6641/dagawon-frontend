"use client";

import * as React from "react";
import { cn } from "./utils";

/* ---------------- Types ---------------- */

interface TabsContextProps {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

/* ---------------- Root ---------------- */

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  className,
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    controlledValue ?? defaultValue ?? ""
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = (val: string) => {
    if (!isControlled) setUncontrolledValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ---------------- List ---------------- */

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

/* ---------------- Trigger ---------------- */

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { value: activeValue, setValue } = useTabs();
    const isActive = value === activeValue;

    return (
      <button
        ref={ref}
        data-slot="tabs-trigger"
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-card text-foreground dark:border-input dark:bg-input/30"
            : "text-foreground dark:text-muted-foreground",
          className,
        )}
        onClick={() => setValue(value)}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

/* ---------------- Content ---------------- */

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabs();
  if (activeValue !== value) return null;

  return (
    <div
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

/* ---------------- Exports ---------------- */

export { Tabs, TabsList, TabsTrigger, TabsContent };