"use client";

import * as React from "react";
import { cn } from "./utils";

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

function RadioGroup({ className, value, onValueChange, name, children, ...props }: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = React.useState(value);

  React.useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setSelectedValue(val);
    onValueChange?.(val);
  };

  return (
    <div
      role="radiogroup"
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioGroupItemProps>(child)) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === selectedValue,
            onChange: () => handleChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
}

function RadioGroupItem({ className, value, checked, onChange, ...props }: RadioGroupItemProps) {
  return (
    <label
      data-slot="radio-group-item"
      className={cn(
        "relative flex items-center cursor-pointer",
        className
      )}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
        {...props}
      />
      <span
        className={cn(
          "inline-block w-4 h-4 rounded-full border border-input bg-input-background peer-checked:border-primary peer-checked:bg-primary transition-all",
        )}
      >
        {checked && (
          <span className="block w-2 h-2 bg-white rounded-full m-[2px]" />
        )}
      </span>
    </label>
  );
}

export { RadioGroup, RadioGroupItem };