"use client";

import * as React from "react";
import { cn } from "./utils";
import { Input } from "./input";
import { Separator } from "./separator";

/* ---------------- Sidebar Context ---------------- */

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContextProps {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}

/* ---------------- Sidebar Provider ---------------- */

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(
    () => (isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev)),
    [isMobile, setOpen, setOpenMobile]
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
        className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        data-sidebar="mobile-sidebar"
        className={cn(
          "fixed inset-0 z-50 bg-black/50 flex transition-opacity",
          openMobile ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          data-slot="sidebar-content"
          className={cn("bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0", className)}
          style={{ width: SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
        >
          <div className="flex flex-col">
            {children}
            <button
              onClick={() => setOpenMobile(false)}
              className="absolute top-2 right-2 text-white p-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      {...props}
    >
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 flex h-screen w-[var(--sidebar-width)] flex-col transition-all",
          side === "left" ? "left-0" : "right-0",
          className
        )}
      >
        <div data-sidebar="inner" className="bg-sidebar flex h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Sidebar Trigger ---------------- */

function SidebarTrigger({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      className={cn("size-7 p-2", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

/* ---------------- Sidebar Input ---------------- */

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input className={cn("bg-background h-8 w-full shadow-none", className)} {...props} />;
}

/* ---------------- Sidebar Separator ---------------- */

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={cn("bg-sidebar-border mx-2", className)} {...props} />;
}

/* ---------------- Sidebar Menu Button ---------------- */

function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
  tooltip?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}) {
  const { isMobile, state } = useSidebar();

  const sizeClasses =
    size === "sm"
      ? "h-7 text-xs"
      : size === "lg"
      ? "h-12 text-sm"
      : "h-8 text-sm";

  const variantClasses =
    variant === "outline" ? "border border-sidebar-border" : "";

  return (
    <button
      data-slot="sidebar-menu-button"
      data-active={isActive}
      title={tooltip && state === "collapsed" && !isMobile ? tooltip : undefined}
      className={cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    />
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInput,
  SidebarSeparator,
  SidebarMenuButton,
  useSidebar,
};