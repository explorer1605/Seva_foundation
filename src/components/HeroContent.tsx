import React from "react";

export function HeroContent() {
  return (
    <div className="space-y-6 max-w-xl mx-auto md:mx-0">
      <h1 className="font-serif font-bold text-[#C87941] leading-tight text-[44px] sm:text-[54px] md:text-[64px] lg:text-[72px] tracking-tight hover:text-[#C87941]/95 transition-colors">
        Gou seva Govind Seva
      </h1>
      <p className="font-serif italic font-normal text-[#5C4A3E] text-[18px] sm:text-[22px] md:text-[25px] lg:text-[28px] leading-relaxed">
        "Every roti you give, feeds the divine."
      </p>
      
      {/* Dynamic Vector Icon / Art Container replacing mock image placeholder */}
      <div className="pt-2 flex justify-center md:justify-start">
        <div 
          className="w-full max-w-[500px] aspect-[500/460] bg-transparent rounded-[24px] p-2 hover:scale-[1.02] transition-transform duration-500 ease-out"
          id="hero-illustration-wrapper"
        >
          <BalKrishnaSVG />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   HIGH-FIDELITY BAL KRISHNA ILLUSTRATION SVG
   ========================================================================== */
function BalKrishnaSVG() {
  return (
    <svg 
      viewBox="0 0 520 480" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full drop-shadow-md select-none"
    >
      {/* Ambient background soft shadow */}
      <circle cx="260" cy="240" r="210" fill="#EBE4D8" fillOpacity="0.3" filter="blur(8px)" />

      {/* Red backdrop block shape exactly as shown in reference layout */}
      <rect x="110" y="80" width="300" height="300" rx="150" fill="#A94A42" />

      {/* LEFT VIBRANT PEACOCK FEATHER */}
      <g transform="translate(110, 240) rotate(-25) scale(0.95)" className="animate-pulse">
        {/* Stem */}
        <path d="M0,80 Q-20,0 -10,-120" stroke="#3D2D20" strokeWidth="4" strokeLinecap="round" />
        {/* Plumes */}
        <path d="M-10,-120 C-40,-90 -60,-40 -40,10 C-30,40 -10,60 0,60 C10,60 20,40 10,10 C0,-40 -10,-90 -10,-120 Z" fill="#3B533A" />
        <path d="M-10,-110 C-30,-80 -45,-40 -30,0 C-20,20 -10,35 0,35 C10,35 15,20 5,0 C-5,-40 -10,-80 -10,-110 Z" fill="#1A936F" />
        <path d="M-10,-90 C-20,-70 -30,-40 -20,-10 C-15,10 -10,20 0,20 C10,20 10,10 5,-10 C0,-30 -10,-70 -10,-90 Z" fill="#E9C46A" />
        <circle cx="-6" cy="-25" r="14" fill="#028090" />
        <circle cx="-6" cy="-25" r="9" fill="#003049" />
      </g>

      {/* RIGHT VIBRANT PEACOCK FEATHER */}
      <g transform="translate(410, 240) rotate(25) scale(0.95)">
        {/* Stem */}
        <path d="M0,80 Q20,0 10,-120" stroke="#3D2D20" strokeWidth="4" strokeLinecap="round" />
        {/* Plumes */}
        <path d="M10,-120 C40,-90 60,-40 40,10 C30,40 10,60 0,60 C-10,60 -20,40 -10,10 C0,-40 10,-90 10,-120 Z" fill="#3B533A" />
        <path d="M10,-110 C30,-80 45,-40 30,0 C20,20 10,35 0,35 C-10,35 -15,20 -5,0 C5,-40 10,-80 10,-110 Z" fill="#1A936F" />
        <path d="M10,-90 C20,-70 30,-40 20,-10 C15,10 10,20 0,20 C-10,20 -10,10 -5,-10 C0,-30 10,-70 10,-90 Z" fill="#E9C46A" />
        <circle cx="6" cy="-25" r="14" fill="#028090" />
        <circle cx="6" cy="-25" r="9" fill="#003049" />
      </g>

      {/* BABY KRISHNA BODY (Styled in lovely light blue color palette) */}
      <g transform="translate(160, 110)">
        {/* Legs / Sitting posture */}
        <path d="M40,240 Q100,280 200,240 Q210,230 180,210 Q140,225 100,210 Q60,230 40,240 Z" fill="#0EA5E9" />
        {/* Saffron dhoti folds wrapping the silhouette */}
        <path d="M42,238 C70,250 130,265 198,238 C192,230 170,220 150,224 C110,224 80,222 42,238 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
        
        {/* Main Body Torso */}
        <path d="M70,140 Q65,220 100,224 Q135,220 130,140 Z" fill="#38BDF8" />
        <path d="M70,140 Q65,220 100,224 Q135,220 130,140 Z" stroke="#0ea5e9" strokeWidth="3" />

        {/* Arms holding the butter pot */}
        {/* Left arm */}
        <path d="M68,144 Q30,170 65,195 Q80,195 80,175 C80,165 72,155 68,144 Z" fill="#38BDF8" stroke="#0ea5e9" strokeWidth="3" />
        {/* Right arm */}
        <path d="M132,144 Q170,170 135,195 Q120,195 120,175 C120,165 128,155 132,144 Z" fill="#38BDF8" stroke="#0ea5e9" strokeWidth="3" />

        {/* Neck ornaments & pearls */}
        <path d="M85,142 Q100,165 115,142" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="155" r="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />
        <circle cx="91" cy="151" r="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />
        <circle cx="109" cy="151" r="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />

        {/* Face */}
        <circle cx="100" cy="98" r="42" fill="#38BDF8" />
        <circle cx="100" cy="98" r="42" stroke="#0ea5e9" strokeWidth="3" />

        {/* Traditional forehead Tilak (Urdhva Pundra) */}
        <path d="M96,64 L104,64 L102,82 L100,86 L98,82 Z" fill="#F59E0B" />
        <circle cx="100" cy="89" r="2.5" fill="#EF4444" />

        {/* Cute smiley eyes closed in joy */}
        <path d="M74,96 Q84,106 90,98" stroke="#3D2D20" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M126,96 Q116,106 110,98" stroke="#3D2D20" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Rosy cheeks */}
        <circle cx="72" cy="110" r="6" fill="#F43F5E" fillOpacity="0.4" />
        <circle cx="128" cy="110" r="6" fill="#F43F5E" fillOpacity="0.4" />

        {/* Extremely joyful open smiling mouth with sparkling white teeth */}
        <path d="M90,112 Q100,132 110,112 Z" fill="#EF4444" />
        <path d="M92,113 Q100,119 108,113 Z" fill="#FFFFFF" />

        {/* Cute Baby Ears with gold earrings */}
        <circle cx="56" cy="100" r="8" fill="#38BDF8" stroke="#0ea5e9" strokeWidth="2" />
        <circle cx="144" cy="100" r="8" fill="#38BDF8" stroke="#0ea5e9" strokeWidth="2" />
        <circle cx="53" cy="108" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <circle cx="147" cy="108" r="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

        {/* Hair block top */}
        <path d="M58,90 Q100,48 142,90 C146,80 144,64 130,55 C115,48 85,48 70,55 C56,64 54,80 58,90 Z" fill="#3D2D20" />

        {/* Splendid Saffron crown (Mukut) */}
        <path d="M72,56 Q100,22 128,56 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
        <path d="M85,55 L100,32 L115,55 Z" fill="#EF4444" />
        {/* Crown pearls decoration */}
        <circle cx="100" cy="28" r="3.5" fill="#FFFFFF" stroke="#3D2D20" strokeWidth="1" />
        <line x1="72" y1="56" x2="128" y2="56" stroke="#FFFFFF" strokeWidth="3" />

        {/* Majestic Crown Peacock Feather */}
        <g transform="translate(100, 24) rotate(-15) scale(0.65)">
          <path d="M0,0 Q-10,-40 -5,-70" stroke="#3D2D20" strokeWidth="3" />
          <path d="M-5,-70 C-20,-50 -30,-20 -20,10 C-15,25 -5,35 0,35 C5,35 15,25 10,10 C5,-20 -5,-50 -5,-70 Z" fill="#3B533A" />
          <path d="M-5,-65 C-15,-45 -25,-25 -15,-5 C-10,5 -5,15 0,15 C5,15 10,5 5,-5 C0,-25 -5,-45 -5,-65 Z" fill="#10B981" />
          <circle cx="-2" cy="-15" r="9" fill="#028090" />
          <circle cx="-2" cy="-15" r="5" fill="#003049" />
        </g>

        {/* GOLDEN EARTHEN BUTTER POT (Makkhan Handi) positioned in front lap */}
        <g transform="translate(70, 160)">
          {/* Pot body */}
          <ellipse cx="30" cy="38" rx="28" ry="24" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          {/* Ornamental white patterns on pot */}
          <path d="M8,34 Q30,48 52,34" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="3 3" />
          <path d="M12,42 Q30,54 48,42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Pot Neck rim */}
          <ellipse cx="30" cy="18" rx="20" ry="6" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />

          {/* Overflowing delicious fresh white butter (Makkhan) */}
          <path d="M12,18 C12,5 48,5 48,18 C46,25 38,28 30,24 C22,28 14,25 12,18 Z" fill="#F5F1E9" />
          {/* dripping butter drops */}
          <circle cx="20" cy="27" r="4" fill="#F5F1E9" />
          <circle cx="40" cy="30" r="3" fill="#F5F1E9" />
          <path d="M28,24 C28,34 32,34 32,24 Z" fill="#F5F1E9" />
        </g>

        {/* SWEET BAMBOO FLUTE (Bansuri) lying gracefully at Krishna's feet */}
        <g transform="translate(45, 230) rotate(16)">
          <rect x="0" y="0" width="130" height="9" rx="4.5" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          {/* Decorative red thread windings (bands) */}
          <rect x="20" y="0.5" width="4" height="8" fill="#EF4444" />
          <rect x="42" y="0.5" width="4" height="8" fill="#EF4444" />
          <rect x="75" y="0.5" width="4" height="8" fill="#EF4444" />
          <rect x="105" y="0.5" width="4" height="8" fill="#EF4444" />
          {/* Hanging tassels (red threads) with gold beads */}
          <path d="M115,4 Q125,12 120,24" stroke="#EF4444" strokeWidth="2" fill="none" />
          <path d="M117,4 Q129,14 125,26" stroke="#EF4444" strokeWidth="2" fill="none" />
          <circle cx="120" cy="24" r="3" fill="#F59E0B" />
          <circle cx="125" cy="26" r="3" fill="#F59E0B" />
          {/* Playing finger holes */}
          <circle cx="32" cy="4.5" r="1.5" fill="#3D2D20" />
          <circle cx="52" cy="4.5" r="1.5" fill="#3D2D20" />
          <circle cx="64" cy="4.5" r="1.5" fill="#3D2D20" />
          <circle cx="76" cy="4.5" r="1.5" fill="#3D2D20" />
          <circle cx="88" cy="4.5" r="1.5" fill="#3D2D20" />
        </g>
      </g>
    </svg>
  );
}
