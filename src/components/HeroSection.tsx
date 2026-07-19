import React from "react";
import { ServiceCalendar } from "./ServiceCalendar";
import { HeroContent } from "./HeroContent";

interface HeroSectionProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDateSelect: (dateString: string, element: HTMLButtonElement) => void;
}

export function HeroSection({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onDateSelect,
}: HeroSectionProps) {
  return (
    <section className="min-h-screen pt-18 flex items-center justify-center px-4 md:px-8 py-12">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-y-12 md:gap-x-8">
          
          {/* LEFT PANEL - SERVICE CALENDAR CARD */}
          <div className="order-2 md:order-1 md:col-span-5 flex justify-center md:justify-start">
            <ServiceCalendar 
              month={month} 
              year={year} 
              onPrevMonth={onPrevMonth}
              onNextMonth={onNextMonth}
              onDateSelect={onDateSelect} 
            />
          </div>

          {/* COLUMN 6 - CENTER GUTTER */}
          <div className="hidden md:block md:col-span-1" />

          {/* RIGHT PANEL - HERO CONTENT */}
          <div className="order-1 md:order-2 md:col-span-6 flex flex-col justify-center text-center md:text-left">
            <HeroContent />
          </div>
          
        </div>
      </div>
    </section>
  );
}
