import React from "react";
import { Toast } from "../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full font-sans">
      {toasts.map((toast) => {
        let bgColor = "bg-white border-[#EBE4D8]";
        let textColor = "text-[#3D2D20]";
        let borderColor = "border-[#EBE4D8]";

        if (toast.type === "success") {
          bgColor = "bg-[#3B533A]";
          textColor = "text-white";
          borderColor = "border-[#3B533A]";
        } else if (toast.type === "error") {
          bgColor = "bg-[#A94A42]";
          textColor = "text-white";
          borderColor = "border-[#A94A42]";
        } else if (toast.type === "info") {
          bgColor = "bg-[#5C4A3E]";
          textColor = "text-white";
          borderColor = "border-[#5C4A3E]";
        }

        return (
          <div
            key={toast.id}
            className={`px-4 py-3.5 rounded-xl border shadow-lg text-[14px] font-medium flex items-center justify-between transition-all duration-300 transform translate-y-0 scale-100 ${bgColor} ${textColor} ${borderColor} animate-slide-up`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              <span>{toast.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
