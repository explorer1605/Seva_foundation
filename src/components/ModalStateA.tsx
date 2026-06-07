import React from "react";

interface ModalStateAProps {
  formattedDate: string;
}

export function ModalStateA({ formattedDate }: ModalStateAProps) {
  const WHATSAPP_NUMBER_PLACEHOLDER = "7000731486"; 
  const messageText = `Namaste, I would like to book Gou Seva for ${formattedDate}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="space-y-6">
      <div className="space-y-3 font-sans text-[15px] leading-[1.65] text-[#5C4A3E]">
        <p className="font-medium text-[#3D2D20]">
          You can provide the Gou Seva today!
        </p>
        <p>
          We will feed cows with 100 Roti and Gud on your name.
        </p>
      </div>
      
      <div className="pt-2">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book Gou Seva for ${formattedDate} via WhatsApp`}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-[12px] bg-[#25D366] text-white font-sans font-semibold text-[15px] hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_4px_12px_rgba(37,211,102,0.2)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 cursor-pointer"
        >
          {/* Custom inline vector logo of whatsapp */}
          <svg 
            className="w-5 h-5 fill-current" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.837.001-2.63-1.013-5.102-2.856-6.947C16.638 1.977 14.17 1.958 12.01 1.958c-5.44 0-9.865 4.41-9.867 9.843-.001 1.763.468 3.486 1.354 5.011l-1.012 3.693 3.791-.995zM17.151 14.1c-.28-.141-1.656-.818-1.912-.912-.257-.094-.444-.141-.63.141-.187.28-.724.912-.888 1.1-.164.187-.327.21-.607.07-.28-.141-1.184-.437-2.257-1.393-.834-.744-1.397-1.662-1.56-1.943-.164-.282-.018-.434.122-.574.127-.127.282-.327.422-.49.141-.164.187-.282.282-.47.094-.188.047-.353-.023-.494-.07-.141-.63-1.519-.863-2.083-.227-.547-.457-.473-.63-.482-.163-.008-.35-.01-.537-.01-.187 0-.49.07-.747.353-.257.282-.981.96-1.981 1.943s.724 1.912.834 2.083c.11.164 1.93 2.946 4.676 4.13.654.282 1.165.451 1.562.577.657.21 1.256.179 1.729.11.527-.078 1.656-.677 1.89-1.332.233-.654.233-1.218.163-1.331-.07-.112-.257-.21-.537-.35z" />
          </svg>
          <span>Book Now via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
