import React, { useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { Booking } from "../types";
import { startOfMonth, endOfMonth, format } from "date-fns";

interface UseBookingsReturn {
  getBookingsForMonth: (year: number, month: number) => Promise<Booking[]>;
  clearCacheForMonth: (year: number, month: number) => void;
  bookingCache: React.MutableRefObject<Map<string, Booking[]>>;
  isLoading: boolean;
  error: string | null;
}

export function useBookings(): UseBookingsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const bookingCache = useRef<Map<string, Booking[]>>(new Map());

  const getBookingsForMonth = useCallback(
    async (year: number, month: number): Promise<Booking[]> => {
      const cacheKey = `${year}-${String(month).padStart(2, "0")}`;

      // Return cached data if available
      if (bookingCache.current.has(cacheKey)) {
        return bookingCache.current.get(cacheKey)!;
      }

      setIsLoading(true);
      setError(null);

      try {
        const monthDate = new Date(year, month - 1, 1);
        const from = format(startOfMonth(monthDate), "yyyy-MM-dd");
        const to   = format(endOfMonth(monthDate),   "yyyy-MM-dd");

        const { data, error: supabaseError } = await supabase
          .from("gouseva_bookings")
          .select("*")
          .gte("seva_date", from)
          .lte("seva_date", to);

        if (supabaseError) throw supabaseError;

        const bookings = (data ?? []) as Booking[];
        bookingCache.current.set(cacheKey, bookings);
        return bookings;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch bookings";
        setError(message);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearCacheForMonth = useCallback((year: number, month: number) => {
    const cacheKey = `${year}-${String(month).padStart(2, "0")}`;
    bookingCache.current.delete(cacheKey);
  }, []);

  return { getBookingsForMonth, clearCacheForMonth, bookingCache, isLoading, error };
}
