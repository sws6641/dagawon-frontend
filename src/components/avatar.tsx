"use client";

import * as React from "react";
import { cn } from "./utils";

type AvatarProps = React.PropsWithChildren<{
  className?: string;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}>;

function Avatar({ className, src, alt, fallback, ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      data-slot="avatar"
      className={cn("relative flex w-10 h-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {src && !imgError ? (
        <img
          data-slot="avatar-image"
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          data-slot="avatar-fallback"
          className="bg-muted flex w-full h-full items-center justify-center rounded-full"
        >
          {fallback || (alt ? alt[0].toUpperCase() : "?")}
        </div>
      )}
    </div>
  );
}

export { Avatar };