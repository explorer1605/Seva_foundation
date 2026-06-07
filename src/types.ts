export interface Booking {
  id: string;
  seva_date: string;       // "YYYY-MM-DD"
  sponsor_name: string;
  youtube_url: string | null;  // full canonical URL or null
  created_at: string;
}

export type ModalState =
  | { type: "available" }
  | { type: "past_booked_with_video"; sponsorName: string; youtubeUrl: string }
  | { type: "booked_today";     sponsorName: string }
  | { type: "booked_future";    sponsorName: string }
  | { type: "booked_past_no_video"; sponsorName: string };
