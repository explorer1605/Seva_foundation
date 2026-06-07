import React from "react";
import { buildEmbedUrl } from "../lib/youtubeUtils";

interface ModalStateBProps {
  sponsorName: string;
  youtubeUrl: string;
  formattedDate: string;
}

export function ModalStateB({ sponsorName, youtubeUrl, formattedDate }: ModalStateBProps) {
  const embedUrl = buildEmbedUrl(youtubeUrl) || "";

  return (
    <div className="space-y-4 font-sans">
      <p className="font-semibold text-[17px] text-[#3D2D20]">
        Seva by: {sponsorName}
      </p>
      
      {/* Responsive YouTube Embed */}
      {embedUrl ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-[10px] bg-neutral-900 border border-[#EBE4D8]">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Seva recording for ${formattedDate}`}
          />
        </div>
      ) : (
        <p className="text-sm text-[#5C4A3E] italic">
          Recording URL is invalid or unavailable.
        </p>
      )}
    </div>
  );
}
