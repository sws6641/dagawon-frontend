"use client";

import React, { useState, useRef } from "react";

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
};

export function Select({ value: propValue, onChange, children, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue || "");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    setValue(val);
    setOpen(false);
    onChange?.(val);
  };

  const selectedLabel = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child) => child as React.ReactElement<SelectItemProps>)
    .find((child) => child.props.value === value)?.props.children;

  return (
    <div
      ref={containerRef}
      className="relative w-48"
      tabIndex={0}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel ?? placeholder ?? "Select..."}</span>
        <span className="ml-2 inline-block transform transition-transform duration-200">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-md">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;

            const element = child as React.ReactElement<SelectItemProps>;
            const isSelected = element.props.value === value;

            return (
              <li
                key={element.props.value}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-100 flex justify-between items-center ${
                  isSelected ? "font-semibold" : ""
                }`}
                onClick={() => handleSelect(element.props.value)}
              >
                {element.props.children}
                {isSelected && <span className="ml-2">✔</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function SelectItem({ children }: SelectItemProps) {
  return <>{children}</>;
}