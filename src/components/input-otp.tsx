"use client";

import * as React from "react";
import { cn } from "./utils";

type InputOTPProps = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  containerClassName?: string;
  className?: string;
};

function InputOTP({
  value,
  onChange,
  length = 6,
  containerClassName,
  className,
}: InputOTPProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    const newValue =
      value.substring(0, idx) + val + value.substring(idx + 1, length);
    onChange(newValue);

    // 다음 칸으로 이동
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div
      data-slot="input-otp"
      className={cn("flex items-center gap-2", containerClassName)}
    >
     {Array.from({ length }).map((_, idx) => (
  <input
    key={idx}
    ref={(el) => {
      inputsRef.current[idx] = el;
    }}
    type="text"
    inputMode="numeric"
    maxLength={1}
    value={value[idx] ?? ""}
    onChange={(e) => handleChange(e.target.value.slice(-1), idx)}
    onKeyDown={(e) => handleKeyDown(e, idx)}
    className={cn(
      "flex h-9 w-9 items-center justify-center text-center border border-input bg-input-background text-sm rounded-md focus:ring-2 focus:ring-ring outline-none",
      className
    )}
  />
))}
    </div>
  );
}

function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-slot"
      className={cn(
        "flex h-9 w-9 items-center justify-center border border-input rounded-md text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function InputOTPSeparator({
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="flex items-center justify-center"
      {...props}
    >
      {/* MinusIcon 대체 → SVG 직접 작성 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };