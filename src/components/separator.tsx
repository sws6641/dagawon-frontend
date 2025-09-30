"use client";

import React from "react";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean; // 시멘틱 목적
};

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : undefined}
      aria-orientation={orientation}
      className={`bg-border shrink-0 ${
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px"
      } ${className ?? ""}`}
      {...props}
    />
  );
}