"use client";

import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";

type CarouselProps = {
  children: React.ReactNode;
  className?: string;
};

type CarouselContextProps = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

function Carousel({ children, className }: CarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const scrollPrev = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: "smooth" });
  };

  const updateButtons = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth);
  };

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons);
    updateButtons();
    return () => el.removeEventListener("scroll", updateButtons);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <CarouselContext.Provider value={{ scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn("relative overflow-hidden", className)}
      >
        <div ref={containerRef} className="flex overflow-x-auto scroll-smooth gap-4">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-shrink-0 w-full", className)}>{children}</div>;
}

function CarouselPrevious(props: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button {...props} disabled={!canScrollPrev} onClick={scrollPrev} className={cn("absolute left-2 top-1/2 -translate-y-1/2", props.className)}>
      {"<"}
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext(props: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button {...props} disabled={!canScrollNext} onClick={scrollNext} className={cn("absolute right-2 top-1/2 -translate-y-1/2", props.className)}>
      {">"}
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext };