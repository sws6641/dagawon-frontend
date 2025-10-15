"use client";

import * as React from "react";
import { cn } from "./utils";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  className?: string;
}

function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [min, max],
  onValueChange,
  className,
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = React.useState<[number, number]>(
    defaultValue
  );

  const controlled = value !== undefined;
  const currentValue = controlled ? value! : internalValue;

  const handleChange = (index: 0 | 1, newValue: number) => {
    const clampedValue: [number, number] =
      index === 0
        ? [Math.min(newValue, currentValue[1] - step), currentValue[1]]
        : [currentValue[0], Math.max(newValue, currentValue[0] + step)];

    if (!controlled) setInternalValue(clampedValue);
    onValueChange?.(clampedValue);
  };

  // thumb 위치 비율 계산
  const leftPercent = ((currentValue[0] - min) / (max - min)) * 100;
  const rightPercent = ((currentValue[1] - min) / (max - min)) * 100;

  return (
    <div
      data-slot="range-slider"
      className={cn("relative w-full h-6 flex items-center", className)}
    >
      {/* 트랙 */}
      <div className="absolute w-full h-2 rounded-full bg-muted" />

      {/* 선택된 구간 */}
      <div
        className="absolute h-2 rounded-full bg-primary"
        style={{
          left: `${leftPercent}%`,
          width: `${rightPercent - leftPercent}%`,
        }}
      />

      {/* 최소 thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={(e) => handleChange(0, Number(e.target.value))}
        className={cn(
          "absolute w-full appearance-none bg-transparent cursor-pointer",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow hover:[&::-webkit-slider-thumb]:bg-primary hover:[&::-webkit-slider-thumb]:border-primary",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow"
        )}
      />

      {/* 최대 thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue[1]}
        onChange={(e) => handleChange(1, Number(e.target.value))}
        className={cn(
          "absolute w-full appearance-none bg-transparent cursor-pointer",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow hover:[&::-webkit-slider-thumb]:bg-primary hover:[&::-webkit-slider-thumb]:border-primary",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow"
        )}
      />
    </div>
  );
}

export { RangeSlider };