"use client";

import * as React from "react";
import { cn } from "./utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 ~ 100
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="bg-primary h-full transition-all"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export { Progress };