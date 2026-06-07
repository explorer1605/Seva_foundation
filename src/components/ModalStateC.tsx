import React from "react";

interface ModalStateCProps {
  sponsorName: string;
  type: "booked_today" | "booked_future" | "booked_past_no_video";
  place: string | null;
}

export function ModalStateC({ sponsorName, type, place }: ModalStateCProps) {
  let statusText = "";
  if (type === "booked_today") {
    statusText = "✨ Seva is booked and in progress today. The recording will be uploaded tomorrow!";
  } else if (type === "booked_future") {
    statusText = "✨ Seva is booked and yet to be completed.";
  } else {
    // booked_past_no_video
    statusText = "✨ Seva was completed. The video will be uploaded soon.";
  }

  return (
    <div className="space-y-4 font-sans">
      <div>
        <p className="font-semibold text-[17px] text-[#3D2D20]">
          Seva by: {sponsorName}
        </p>
        {place && (
          <p className="text-[14px] text-[#5C4A3E]/80 font-medium flex items-center gap-1 mt-1">
            <span>📍 {place}</span>
          </p>
        )}
      </div>
      <p className="font-normal text-[14px] text-[#5C4A3E] leading-[1.6]">
        {statusText}
      </p>
    </div>
  );
}
