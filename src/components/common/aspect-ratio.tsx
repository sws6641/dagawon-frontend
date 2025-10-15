"use client";

import * as React from "react";

type AspectRatioProps = React.PropsWithChildren<{
  ratio?: number; // width / height 비율, 기본 16/9
  className?: string;
  style?: React.CSSProperties;
}>;

function AspectRatio({ children, ratio = 16 / 9, className, style }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={className}
      style={{
        position: "relative",
        width: "100%",
        paddingTop: `${100 / ratio}%`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export { AspectRatio };