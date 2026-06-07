import React, { useState, useEffect } from "react";
import { supabase }            from "../lib/supabaseClient";
import { normalizeYouTubeUrl } from "../lib/youtubeUtils";
import { useBookingContext }    from "../context/BookingContext";
import { Booking } from "../types";

interface AdminFormProps {
  onSuccess: (action: "created" | "updated") => void;
  onError:   (message: string) => void;
}

export function AdminForm({ onSuccess, onError }: AdminFormProps) {
  const { invalidateMonth } = useBookingContext();

  const [sevaDate,     setSevaDate]     = useState("");
  const [sponsorName,  setSponsorName]  = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [placeInput,   setPlaceInput]   = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOverwrite, setConfirmOverwrite] = useState(false);

  // Dynamic duplicate check across all months (Section 20B)
  const [existingBooking, setExistingBooking] = useState<Booking | null>(null);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);

  useEffect(() => {
    if (!sevaDate) {
      setExistingBooking(null);
      return;
    }

    const [checkYear, checkMonth] = sevaDate.split("-").map(Number);
    if (isNaN(checkYear) || isNaN(checkMonth)) return;

    setCheckingDuplicate(true);

    // Always fetch fresh from Supabase — bypass cache for admin accuracy
    supabase
      .from("gouseva_bookings")
      .select("*")
      .eq("seva_date", sevaDate)
      .maybeSingle()
      .then(
        ({ data }) => {
          setExistingBooking(data ?? null);
          if (data) {
            setSponsorName(data.sponsor_name || "");
            setYoutubeInput(data.youtube_url || "");
            setPlaceInput(data.place || "");
          } else {
            setSponsorName("");
            setYoutubeInput("");
            setPlaceInput("");
          }
          setCheckingDuplicate(false);
        },
        (err) => {
          console.error(err);
          setCheckingDuplicate(false);
        }
      );

  }, [sevaDate]);

  const validate = (): string | null => {
    if (!sevaDate)     return "Date is required.";
    if (!sponsorName.trim()) return "Sponsor name is required.";
    if (youtubeInput.trim()) {
      const normalized = normalizeYouTubeUrl(youtubeInput.trim());
      if (!normalized)  return "Invalid YouTube URL. Must be a valid youtube.com or youtu.be link.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) { onError(validationError); return; }

    // If overwriting an existing booking, require explicit confirmation
    if (existingBooking && !confirmOverwrite) {
      setConfirmOverwrite(true);
      return;
    }

    setIsSubmitting(true);
    const isUpdate = Boolean(existingBooking);

    try {
      const youtube_url = youtubeInput.trim()
        ? normalizeYouTubeUrl(youtubeInput.trim())
        : null;

      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("Not authenticated.");

      const { error: upsertError } = await supabase
        .from("gouseva_bookings")
        .upsert(
          {
            seva_date:    sevaDate,
            sponsor_name: sponsorName.trim(),
            youtube_url,
            place:        placeInput.trim() || null,
          },
          { onConflict: "seva_date" }
        );

      if (upsertError) throw upsertError;

      // Invalidate the cache to fetch fresh data (Section 20A)
      const [upsertYear, upsertMonth] = sevaDate.split("-").map(Number);
      await invalidateMonth(upsertYear, upsertMonth);

      onSuccess(isUpdate ? "updated" : "created");
      setSevaDate(""); setSponsorName(""); 
      setYoutubeInput(""); setPlaceInput(""); setConfirmOverwrite(false);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md font-sans">
      {/* Date field */}
      <div>
        <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="seva_date">
          Seva Date *
        </label>
        <input
          id="seva_date"
          type="date"
          value={sevaDate}
          onChange={(e) => { setSevaDate(e.target.value); setConfirmOverwrite(false); }}
          className="w-full border border-[#EBE4D8] rounded-lg p-3 text-[15px] bg-[#FBF8F3]/30 focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none"
          required
        />
        {/* Indicator while checking duplicate */}
        {checkingDuplicate && (
          <p className="text-xs text-[#5C4A3E] mt-1.5 animate-pulse">Checking availability…</p>
        )}
        {/* Warn admin if this date is already booked */}
        {existingBooking && !checkingDuplicate && (
          <p className="text-sm text-[#A94A42] mt-1.5 font-medium">
            ⚠️ This date is already booked by <strong>{existingBooking.sponsor_name}</strong>.
            {confirmOverwrite
              ? " Submit again to confirm overwrite."
              : " Click Save again to review and confirm overwrite."}
          </p>
        )}
      </div>

      {/* Sponsor name */}
      <div>
        <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="sponsor_name">
          Sponsor Name *
        </label>
        <input
          id="sponsor_name"
          type="text"
          value={sponsorName}
          onChange={(e) => setSponsorName(e.target.value)}
          placeholder="e.g. Sharma Parivar"
          className="w-full border border-[#EBE4D8] rounded-lg p-3 text-[15px] bg-[#FBF8F3]/30 focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none"
          required
        />
      </div>

      {/* YouTube URL */}
      <div>
        <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="youtube_url">
          YouTube URL (optional)
        </label>
        <input
          id="youtube_url"
          type="url"
          value={youtubeInput}
          onChange={(e) => setYoutubeInput(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full border border-[#EBE4D8] rounded-lg p-3 text-[15px] bg-[#FBF8F3]/30 focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none"
        />
      </div>

      {/* Place */}
      <div>
        <label className="block text-[14px] font-medium text-[#5C4A3E] mb-1.5" htmlFor="place">
          Place (optional)
        </label>
        <input
          id="place"
          type="text"
          value={placeInput}
          onChange={(e) => setPlaceInput(e.target.value)}
          placeholder="e.g. Vrindavan"
          className="w-full border border-[#EBE4D8] rounded-lg p-3 text-[15px] bg-[#FBF8F3]/30 focus:ring-2 focus:ring-[#3D2D20]/10 focus:border-[#3D2D20] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || checkingDuplicate}
        className="w-full bg-[#3D2D20] hover:bg-[#3D2D20]/90 text-white rounded-lg py-3 px-6 font-semibold text-[15px] transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(61,45,32,0.1)] focus:outline-none focus:ring-2 focus:ring-[#3D2D20] focus:ring-offset-2"
      >
        {isSubmitting
          ? "Saving…"
          : confirmOverwrite
          ? "Confirm Overwrite"
          : "Save Booking"}
      </button>
    </form>
  );
}
