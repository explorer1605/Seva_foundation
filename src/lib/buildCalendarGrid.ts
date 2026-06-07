import { getDaysInMonth, getDay, format } from "date-fns";
import { Booking } from "../types";

export type CalendarCell =
  | { type: "empty" }
  | {
      type: "day";
      dateString: string;   // "YYYY-MM-DD"
      dayNumber: number;
      isBooked: boolean;
      isPast: boolean;
      isToday: boolean;
      isClickable: boolean; // false only when isPast AND NOT isBooked
      booking: Booking | null;
    };

export function buildCalendarGrid(
  year: number,
  month: number,         // 1-indexed
  bookings: Booking[]
): CalendarCell[] {
  const firstDay     = new Date(year, month - 1, 1);
  const totalDays    = getDaysInMonth(firstDay);
  const startPadding = getDay(firstDay); // 0 = Sunday
  const today        = new Date(); today.setHours(0, 0, 0, 0);

  const cells: CalendarCell[] = [];

  // Leading empty cells
  for (let i = 0; i < startPadding; i++) {
    cells.push({ type: "empty" });
  }

  for (let day = 1; day <= totalDays; day++) {
    const date       = new Date(year, month - 1, day);
    const dateString = format(date, "yyyy-MM-dd");
    const booking    = bookings.find((b) => b.seva_date === dateString) ?? null;
    
    const cellDateObj = new Date(year, month - 1, day);
    cellDateObj.setHours(0, 0, 0, 0);
    const isPast     = cellDateObj < today;
    const isToday    = cellDateObj.getTime() === today.getTime();
    const isBooked   = booking !== null;

    cells.push({
      type: "day",
      dateString,
      dayNumber: day,
      isBooked,
      isPast,
      isToday,
      isClickable: isBooked || !isPast, // past unbooked = not clickable
      booking,
    });
  }

  return cells;
}
