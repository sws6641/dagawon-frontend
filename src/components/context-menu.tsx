"use client";

import * as React from "react";

// 공용 유틸: className 합치기
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------- Chart -------------------- */

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    color?: string;
  };
};

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer>");
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: {
  id?: string;
  config: ChartConfig;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div data-chart={chartId} className={cn("chart-container", className)} {...props}>
        {children}
        <style>{`
          ${Object.entries(config)
            .map(([key, cfg]) => cfg.color ? `--color-${key}: ${cfg.color};` : "")
            .join("\n")}
        `}</style>
      </div>
    </ChartContext.Provider>
  );
}

/* -------------------- Checkbox -------------------- */

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <label className={cn("checkbox-wrapper", className)}>
      <input type="checkbox" className="checkbox-input" {...props} />
      <span className="checkbox-indicator" />
    </label>
  );
}

/* -------------------- Collapsible -------------------- */

const CollapsibleContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

function Collapsible({ children, open = false }: { children: React.ReactNode; open?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(open);
  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("Trigger must be used inside Collapsible");
  return (
    <button {...props} onClick={ctx.toggle}>
      {children}
    </button>
  );
}

function CollapsibleContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("Content must be used inside Collapsible");
  return <div {...props} style={{ display: ctx.isOpen ? "block" : "none" }}>{children}</div>;
}

/* -------------------- Command -------------------- */

function Command({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("command-container", className)} {...props}>
      {children}
    </div>
  );
}

function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("command-input", className)} {...props} />;
}

function CommandList({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("command-list", className)} {...props}>
      {children}
    </div>
  );
}

function CommandItem({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("command-item", className)} {...props}>
      {children}
    </div>
  );
}

/* -------------------- ContextMenu -------------------- */

function ContextMenu({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("context-menu", className)} {...props}>
      {children}
    </div>
  );
}

function ContextMenuTrigger({
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onClick?: () => void }) {
  return (
    <div {...props} onClick={onClick}>
      {children}
    </div>
  );
}

function ContextMenuContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("context-menu-content", className)} {...props}>
      {children}
    </div>
  );
}

function ContextMenuItem({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("context-menu-item", className)} {...props}>
      {children}
    </div>
  );
}

export {
  ChartContainer,
  useChart,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
};