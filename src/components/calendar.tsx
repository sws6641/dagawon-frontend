"use client";

import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";

type CalendarProps = {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
};

function Calendar({ className, selected, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const isSameDay = (a: Date, b?: Date) =>
    b ? a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() : false;

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  return (
    <div className={cn("p-3 bg-white rounded-lg shadow-md", className)}>
      <div className="flex justify-between items-center mb-2">
        <Button variant="outline" size="sm" onClick={prevMonth}>
          &#8249;
        </Button>
        <span className="text-sm font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </span>
        <Button variant="outline" size="sm" onClick={nextMonth}>
          &#8250;
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startOfMonth.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysInMonth.map((day) => (
          <button
            key={day.toISOString()}
            className={cn(
              "p-2 rounded-md text-sm hover:bg-primary/20",
              isSameDay(day, selected) ? "bg-primary text-white" : "text-foreground"
            )}
            onClick={() => onSelect && onSelect(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}

export { Calendar };