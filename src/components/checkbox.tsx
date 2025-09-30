"use client";

import * as React from "react";
import { cn } from "./utils";

interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center cursor-pointer",
          className
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          className="peer sr-only"
          {...props}
        />
        <span
          data-slot="checkbox"
          className={cn(
            "w-4 h-4 inline-flex items-center justify-center border rounded-[4px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 transition-colors peer-checked:bg-blue-600 peer-checked:border-blue-600",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          >
            <polyline
              points="20 6 9 17 4 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {props.children && (
          <span className="ml-2 select-none">{props.children}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };