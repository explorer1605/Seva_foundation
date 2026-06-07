import { Booking, ModalState } from "../types";
import { parseISO, isToday, isFuture } from "date-fns";
import { extractYouTubeId } from "./youtubeUtils";

export function resolveModalState(
  dateString: string,
  bookings: Booking[]
): ModalState {
  const booking = bookings.find((b) => b.seva_date === dateString);

  if (!booking) return { type: "available" };

  const date = parseISO(dateString);

  // Set hours to 0 to compare days accurately
  const todayVal = new Date();
  todayVal.setHours(0, 0, 0, 0);

  const cellDate = parseISO(dateString);
  cellDate.setHours(0, 0, 0, 0);

  const isTodayDate = cellDate.getTime() === todayVal.getTime();
  const isFutureDate = cellDate.getTime() > todayVal.getTime();

  if (isTodayDate) {
    return { type: "booked_today", sponsorName: booking.sponsor_name };
  }

  if (isFutureDate) {
    return { type: "booked_future", sponsorName: booking.sponsor_name };
  }

  // Past date
  if (booking.youtube_url && extractYouTubeId(booking.youtube_url)) {
    return {
      type: "past_booked_with_video",
      sponsorName: booking.sponsor_name,
      youtubeUrl: booking.youtube_url,
    };
  }

  return { type: "booked_past_no_video", sponsorName: booking.sponsor_name };
}
