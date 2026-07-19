import React from "react";
import { buildEmbedUrl } from "../lib/youtubeUtils";

interface ModalStateBProps {
  sponsorName: string;
  youtubeUrl: string;
  formattedDate: string;
  place: string | null;
}

export function ModalStateB({ sponsorName, youtubeUrl, formattedDate, place }: ModalStateBProps) {
  const embedUrl = buildEmbedUrl(youtubeUrl) || "";

  return (
    <div className="space-y-4 font-sans">
      <div>
        <p className="font-semibold text-[17px] text-primary-brown">
          Seva by: {sponsorName}
        </p>
        {place && (
          <p className="text-[14px] text-body-brown/80 font-medium flex items-center gap-1 mt-1">
            <span>📍 {place}</span>
          </p>
        )}
      </div>
      
      {/* Responsive YouTube Embed */}
      {embedUrl ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-[10px] bg-neutral-900 border border-divider-beige">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Seva recording for ${formattedDate}`}
          />
        </div>
      ) : (
        <p className="text-sm text-body-brown italic">
          Recording URL is invalid or unavailable.
        </p>
      )}
    </div>
  );
}
