import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Booking } from "../types";
import { useBookings } from "../hooks/useBookings";

interface BookingContextValue {
  bookingsForMonth: Booking[];
  isLoading: boolean;
  error: string | null;
  loadMonth: (year: number, month: number) => Promise<void>;
  invalidateMonth: (year: number, month: number) => Promise<void>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const { getBookingsForMonth, clearCacheForMonth, isLoading, error } = useBookings();
  const [bookingsForMonth, setBookingsForMonth] = useState<Booking[]>([]);

  const loadMonth = useCallback(
    async (year: number, month: number) => {
      const data = await getBookingsForMonth(year, month);
      setBookingsForMonth(data);
    },
    [getBookingsForMonth]
  );

  const invalidateMonth = useCallback(
    async (year: number, month: number) => {
      clearCacheForMonth(year, month);
      await loadMonth(year, month);
    },
    [clearCacheForMonth, loadMonth]
  );

  return (
    <BookingContext.Provider value={{ bookingsForMonth, isLoading, error, loadMonth, invalidateMonth }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingContext must be used within BookingProvider");
  return ctx;
}
