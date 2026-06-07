import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { Modal } from "./components/Modal";
import { BookingProvider } from "./context/BookingContext";
import { AdminRoute } from "./components/AdminRoute";
import instagramLogo from "../assets/.aistudio/250px-Instagram_logo_compressed.svg (1).webp";

// Current month/year the calendar displays — changed to match today's real date from metadata
const CALENDAR_MONTH = 6;   // 1-indexed (6 = June)
const CALENDAR_YEAR  = 2026;

// Public Home route wrapping components
function PublicHome() {
  const [currentMonth, setCurrentMonth] = useState<number>(CALENDAR_MONTH);
  const [currentYear, setCurrentYear] = useState<number>(CALENDAR_YEAR);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateSelect = (dateString: string, element: HTMLButtonElement) => {
    triggerRef.current = element;
    setSelectedDate(dateString);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#FBF8F3] text-[#5C4A3E] font-sans antialiased selection:bg-[#EBE4D8] selection:text-[#3D2D20] flex flex-col justify-between">
        <div>
          <NavBar />
          
          <HeroSection 
            month={currentMonth} 
            year={currentYear} 
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onDateSelect={handleDateSelect} 
          />
        </div>

        <FooterSocials />

        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          dateString={selectedDate || ""} 
        />
      </div>
    </BookingProvider>
  );
}

function FooterSocials() {
  return (
    <footer className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto border-t border-[#EBE4D8]/60 mt-12 bg-[#FBF8F3]">
      <div className="text-xs font-sans text-[#5C4A3E]/60 text-center md:text-left">
        © 2026 Seva Foundation. All rights reserved. Seva Parmo Dharm.
      </div>
      <div className="flex items-center gap-4">
        {/* YouTube Icon */}
        <a 
          href="https://www.youtube.com/@Gousevagovindseva"
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 active:scale-95 transition-transform"
          aria-label="Visit our YouTube stream"
        >
          <svg className="w-10 h-10 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11c.502-1.87.502-5.837.502-5.837s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>

        {/* Instagram Icon */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 active:scale-95 transition-transform"
          aria-label="Follow us on Instagram"
        >
          <img 
            src={instagramLogo} 
            alt="Instagram" 
            className="w-10 h-10 object-contain rounded-xl" 
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
