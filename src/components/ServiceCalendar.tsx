import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingContext } from "../context/BookingContext";
import { buildCalendarGrid } from "../lib/buildCalendarGrid";

interface ServiceCalendarProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateSelect: (dateString: string, element: HTMLButtonElement) => void;
}

export function ServiceCalendar({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onDateSelect,
}: ServiceCalendarProps) {
  const { bookingsForMonth, isLoading, error, loadMonth } = useBookingContext();

  useEffect(() => {
    loadMonth(year, month);
  }, [year, month, loadMonth]);

  const monthName = new Date(2000, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
  });

  const cells = buildCalendarGrid(year, month, bookingsForMonth);

  // Hardcoded real today's date from ADDITIONAL_METADATA: 2026-06-04
  const todayStr = "2026-06-04";

  return (
    <div
      className="bg-white border-[1.5px] border-primary-brown rounded-[16px] shadow-[0_8px_32px_rgba(61,45,32,0.10)] w-full max-w-[420px] overflow-hidden mx-auto md:mx-0 flex flex-col justify-between"
      id="service-calendar-card"
    >
      {/* CARD HEADER - DEEP GREEN OVER WITH NAVIGATION */}
      <div className="bg-available-green py-[18px] px-[20px] border-b border-primary-brown">
        <h2 className="font-serif font-semibold text-[24px] text-white tracking-wide text-center">
          Seva parmo Dharm
        </h2>
        <div className="flex items-center justify-between mt-2 px-1 text-divider-beige">
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-divider-beige/50 cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="font-sans font-medium text-[12px] uppercase tracking-widest select-none font-semibold">
            {monthName} {year}
          </span>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all focus:outline-none focus:ring-1 focus:ring-divider-beige/50 cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-[24px] flex-grow flex flex-col justify-center">
        {/* Error State */}
        {error ? (
          <div className="py-8 text-center" id="calendar-error-msg">
            <p className="text-booked-red text-sm font-medium">
              Could not load bookings. Please check your connection.
            </p>
          </div>
        ) : isLoading ? (
          /* Loading State: 7-column skeleton grid of 48x48px pulsing circles of color #EBE4D8 */
          <div className="grid grid-cols-7 gap-y-3 gap-x-2 justify-items-center py-4" id="calendar-loading-skeleton">
            {Array.from({ length: 35 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="w-[48px] h-[48px] rounded-full bg-divider-beige animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Calendar Grid */
          <div className="grid grid-cols-7 gap-y-2 gap-x-1 justify-items-center">
            {/* Weekday headers */}
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName, idx) => (
              <div
                key={`header-${idx}`}
                className="font-sans font-semibold text-[11px] text-body-brown text-center w-[41px] md:w-[42px] h-6 flex items-center justify-center select-none"
              >
                {dayName}
              </div>
            ))}

            {/* Render buildCalendarGrid Cells */}
            {cells.map((cell, idx) => {
              if (cell.type === "empty") {
                return (
                  <div key={`empty-${idx}`} className="w-[41px] md:w-[42px] h-[41px] md:h-[42px]" />
                );
              }

              const { dateString, dayNumber, isBooked, isPast, isToday, isClickable } = cell;

              // Past unbooked cells are not clickable
              if (isPast && !isBooked) {
                return (
                  <div
                    key={`day-${dateString}`}
                    className="w-[41px] md:w-[42px] h-[41px] md:h-[42px] flex items-center justify-center rounded-full text-center relative font-sans font-medium text-[14px] text-[#C4BAB0] cursor-default select-none"
                    aria-label={`${dateString} — past`}
                  >
                    <span>{dayNumber}</span>
                    {isToday && (
                      <span
                        className="absolute bottom-[4px] w-[5px] h-[5px] rounded-full bg-[#C4BAB0]"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                );
              }

              // Clickable button state
              // Status matches booked or available
              const btnClass = isBooked
                ? "border-2 border-[#A94A42] bg-[#A94A42] text-white hover:bg-[#A94A42]/90 focus-visible:ring-2 focus-visible:ring-[#A94A42]"
                : "border-2 border-[#3B533A] bg-[#3B533A] text-white hover:bg-[#3B533A]/90 focus-visible:ring-2 focus-visible:ring-[#3B533A]";

              return (
                <button
                  key={`day-${dateString}`}
                  onClick={(e) => onDateSelect(dateString, e.currentTarget)}
                  disabled={!isClickable}
                  className={`w-[41px] md:w-[42px] h-[41px] md:h-[42px] flex items-center justify-center rounded-full text-center relative font-sans font-medium text-[14px] cursor-pointer transition-all focus:outline-none focus:ring-offset-2 ${btnClass}`}
                  aria-label={`${dateString} — ${isBooked ? "booked" : "available"}`}
                >
                  <span>{dayNumber}</span>
                  {isToday && (
                    <span
                      className="absolute bottom-[4px] w-[5px] h-[4.5px] rounded-full bg-white"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
