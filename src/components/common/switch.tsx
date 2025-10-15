"use client";

import * as React from "react";
import { cn } from "./utils";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Switch({ className, checked, onCheckedChange, ...props }: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(checked ?? false);

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    const newValue = !currentChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onCheckedChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      data-slot="switch"
      onClick={toggle}
      className={cn(
        "inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        currentChecked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
        className,
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform",
          currentChecked ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
        )}
      />
    </button>
  );
}

export { Switch };