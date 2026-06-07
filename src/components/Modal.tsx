import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useBookingContext } from "../context/BookingContext";
import { resolveModalState } from "../lib/resolveModalState";
import { ModalStateA } from "./ModalStateA";
import { ModalStateB } from "./ModalStateB";
import { ModalStateC } from "./ModalStateC";
import { parseISO, format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateString: string;
}

export function Modal({ isOpen, onClose, dateString }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { bookingsForMonth } = useBookingContext();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, iframe, [tabindex="0"]'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab" && focusableElements) {
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !dateString) return null;

  let formattedDate = "";
  try {
    formattedDate = format(parseISO(dateString), "EEEE, d MMMM yyyy");
  } catch (err) {
    formattedDate = dateString;
  }

  // Resolve modal state
  const state = resolveModalState(dateString, bookingsForMonth);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-[#3D2D20]/40 backdrop-blur-[4px] font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-date-title"
      ref={modalRef}
    >
      {/* Backdrop listener to close */}
      <div 
        className="absolute inset-0 cursor-default" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Modal Frame with animations. Centered on desktop, bottom-sheet sliding on mobile */}
      <div 
        className="relative bg-white w-full md:max-w-[480px] p-8 rounded-t-[16px] md:rounded-[16px] shadow-[0_16px_48px_rgba(61,45,32,0.2)] z-10 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 animate-slide-up"
        id="modal-layout-frame"
      >
        {/* Close button with lucide X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5C4A3E] hover:text-[#3D2D20] rounded-full hover:bg-[#F5F1E9] transition-all focus:outline-none focus:ring-2 focus:ring-[#3D2D20] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal headers */}
        <div className="mb-6 pr-6">
          <h3 
            id="modal-date-title"
            className="font-serif font-semibold text-[22px] text-[#3D2D20] leading-snug"
          >
            {formattedDate}
          </h3>
        </div>

        {/* Display corresponding state component */}
        {state.type === "available" && (
          <ModalStateA formattedDate={formattedDate} />
        )}

        {state.type === "past_booked_with_video" && (
          <ModalStateB 
            sponsorName={state.sponsorName} 
            youtubeUrl={state.youtubeUrl} 
            formattedDate={formattedDate} 
          />
        )}

        {(state.type === "booked_today" || 
          state.type === "booked_future" || 
          state.type === "booked_past_no_video") && (
          <ModalStateC 
            sponsorName={state.sponsorName} 
            type={state.type} 
          />
        )}
      </div>
    </div>
  );
}
