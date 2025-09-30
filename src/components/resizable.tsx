"use client";

import * as React from "react";
import { cn } from "./utils";

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  children: React.ReactNode[];
}

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  initialSize?: number; // 0~1, flex 비율
}

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

function ResizablePanelGroup({ direction = "horizontal", children, className, ...props }: ResizablePanelGroupProps) {
  const [sizes, setSizes] = React.useState(() =>
    children.map(() => 1 / children.length)
  );

  const isVertical = direction === "vertical";

  const startDrag = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const startPos = isVertical ? e.clientY : e.clientX;
    const totalSize = isVertical
      ? (e.currentTarget.parentElement as HTMLElement).clientHeight
      : (e.currentTarget.parentElement as HTMLElement).clientWidth;

    const move = (moveEvent: MouseEvent) => {
      const currentPos = isVertical ? moveEvent.clientY : moveEvent.clientX;
      const delta = (currentPos - startPos) / totalSize;

      setSizes(prev => {
        const newSizes = [...prev];
        newSizes[index] = Math.max(0.05, prev[index] + delta);
        newSizes[index + 1] = Math.max(0.05, prev[index + 1] - delta);

        const sum = newSizes.reduce((a, b) => a + b, 0);
        return newSizes.map(s => s / sum); // 합계 1로 정규화
      });
    };

    const stop = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  };

  return (
    <div
      data-slot="resizable-panel-group"
      data-panel-group-direction={direction}
      className={cn("flex h-full w-full", isVertical ? "flex-col" : "flex-row", className)}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <>
          <div
            data-slot="resizable-panel"
            style={{ flex: `${sizes[i]} 1 0%` }}
            className="relative overflow-hidden"
          >
            {child}
          </div>
          {i < children.length - 1 && (
            <div
              data-slot="resizable-handle"
              className={cn(
                "bg-border z-10 flex items-center justify-center",
                isVertical ? "h-px w-full cursor-row-resize" : "h-full w-px cursor-col-resize"
              )}
              onMouseDown={e => startDrag(i, e)}
            >
              <div className="bg-foreground rounded-xs" style={{ width: isVertical ? "100%" : "2px", height: isVertical ? "2px" : "100%" }} />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export { ResizablePanelGroup };