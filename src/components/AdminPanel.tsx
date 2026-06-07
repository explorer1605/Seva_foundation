import React from "react";
import { supabase } from "../lib/supabaseClient";
import { AdminForm } from "./AdminForm";
import { BookingProvider } from "../context/BookingContext";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "./ToastContainer";
import { MessageSquare } from "lucide-react";

interface AdminPanelProps {
  session: any;
}

export function AdminPanel({ session }: AdminPanelProps) {
  const { toasts, showToast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("👋 Logged out successfully.", "info");
  };

  const handleSuccess = (action: "created" | "updated") => {
    if (action === "created") {
      showToast("✅ Seva booked successfully!", "success");
    } else {
      showToast("✅ Seva updated successfully!", "success");
    }
  };

  const handleError = (message: string) => {
    showToast(`❌ ${message}`, "error");
  };

  const userEmail = session?.user?.email || "Admin User";

  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#FBF8F3] font-sans flex flex-col selection:bg-[#EBE4D8] selection:text-[#3D2D20]">
        
        {/* TOP HEADER BAR */}
        <header className="h-[72px] bg-white border-b border-[#EBE4D8] sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="font-serif font-semibold text-[24px] text-[#3D2D20]">
            Gou Seva — Admin
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-sans font-normal text-[13px] text-[#5C4A3E] hidden sm:inline">
              {userEmail}
            </span>

            {/* WhatsApp Link Icon (Section 20D) */}
            <a 
              href="https://wa.me/7000731486" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#5C4A3E] hover:text-[#3D2D20] transition-colors p-1.5 rounded-full hover:bg-[#FBF8F3] flex items-center justify-center"
              aria-label="WhatsApp with us"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              onClick={handleLogout}
              className="bg-transparent border border-[#3D2D20] text-[#3D2D20] rounded-lg px-4 py-2 text-[13px] font-medium font-sans hover:bg-[#3D2D20] hover:text-white transition-all active:scale-[0.98] select-none"
            >
              Logout
            </button>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow max-w-[480px] w-full mx-auto px-6 pt-[48px] pb-12">
          <h1 className="font-serif font-semibold text-[22px] text-[#3D2D20] mb-6">
            Book a Seva Slot
          </h1>

          <div className="bg-white rounded-2xl border border-[#EBE4D8] p-6 shadow-sm animate-slide-up">
            <AdminForm onSuccess={handleSuccess} onError={handleError} />
          </div>
        </main>

        <ToastContainer toasts={toasts} />
      </div>
    </BookingProvider>
  );
}
