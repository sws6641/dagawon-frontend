"use client";

import * as React from "react";
import { cn } from "./utils";

/* ---------------- Types ---------------- */

interface ToggleGroupContextProps {
  variant: "default" | "outline";
  size: "default" | "sm" | "lg";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  variant: "default",
  size: "default",
});

function useToggleGroup() {
  return React.useContext(ToggleGroupContext);
}

/* ---------------- ToggleGroup Root ---------------- */

interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  type?: "single" | "multiple"; // 단일/다중 선택
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  children,
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | string[] | undefined
  >(controlledValue ?? defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (val: string) => {
    let newValue: string | string[];
    if (type === "single") {
      newValue = val;
    } else {
      const currentArray = Array.isArray(value) ? value : [];
      if (currentArray.includes(val)) {
        newValue = currentArray.filter((v) => v !== val);
      } else {
        newValue = [...currentArray, val];
      }
    }

    if (!isControlled) setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <div
        data-slot="toggle-group"
        data-variant={variant}
        data-size={size}
        className={cn(
          "flex w-fit items-center rounded-md",
          variant === "outline" ? "shadow-xs border" : "",
          className
        )}
        {...props}
      >
{React.Children.map(children, (child) => {
  if (!React.isValidElement<ToggleGroupItemProps>(child)) return child;
  return React.cloneElement(child, {
    groupValue: value,
    onGroupValueChange: handleValueChange,
  });
})}
      </div>
    </ToggleGroupContext.Provider>
  );
}

/* ---------------- ToggleGroup Item ---------------- */

interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  groupValue?: string | string[];
  onGroupValueChange?: (value: string) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

function ToggleGroupItem({
  className,
  value,
  groupValue,
  onGroupValueChange,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const context = useToggleGroup();

  const isActive = Array.isArray(groupValue)
    ? groupValue.includes(value)
    : groupValue === value;

  const sizeClasses =
    size || context.size === "sm"
      ? "px-2 py-1 text-xs"
      : size || context.size === "lg"
      ? "px-4 py-2 text-lg"
      : "px-3 py-1.5 text-sm";

  const variantClasses =
    variant || context.variant === "outline"
      ? "border border-gray-300"
      : "bg-gray-200";

  return (
    <button
      type="button"
      data-slot="toggle-group-item"
      data-active={isActive}
      className={cn(
        "flex-1 min-w-0 first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:ring-2 focus-visible:ring-ring",
        sizeClasses,
        variantClasses,
        isActive ? "bg-primary text-white" : "",
        className
      )}
      onClick={() => onGroupValueChange?.(value)}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------------- Exports ---------------- */

export { ToggleGroup, ToggleGroupItem };