"use client";

import * as React from "react";
import { cn } from "./utils";

type CollapsibleProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleToggle = () => {
    if (!isControlled) setUncontrolledOpen((prev) => !prev);
    onOpenChange?.(!open);
  };

  // children을 순회하며 open/onToggle props 전달
const enhancedChildren = React.Children.map(children, (child) => {
  if (!React.isValidElement(child)) return child;
  // ReactElement<any, any>로 단언
  return React.cloneElement(
    child as React.ReactElement<any>,
    { open, onToggle: handleToggle }
  );
});

  return (
    <div data-slot="collapsible">
      {enhancedChildren}
    </div>
  );
}

type CollapsibleTriggerProps = {
  open?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
};

function CollapsibleTrigger({
  open,
  onToggle,
  children,
  className,
}: CollapsibleTriggerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-slot="collapsible-trigger"
      className={cn("cursor-pointer", className)}
      aria-expanded={open}
    >
      {children}
    </button>
  );
}

type CollapsibleContentProps = {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
};

function CollapsibleContent({ open, children, className }: CollapsibleContentProps) {
  return (
    <div
      data-slot="collapsible-content"
      className={cn("overflow-hidden transition-all", className)}
      style={{ maxHeight: open ? "1000px" : "0px" }}
    >
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };