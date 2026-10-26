export function ArchitecturalIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg
      viewBox="0 0 800 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Horizon Baseline */}
      <line x1="20" y1="210" x2="780" y2="210" stroke="#373F3A" strokeWidth="1.5" />

      {/* Main Home Facade 1 (Left Wing) */}
      <path
        d="M120 210 V110 L220 50 L320 110 V210"
        stroke="#A9C9AC"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chimney */}
      <path d="M150 92 V40 H175 V77" stroke="#373F3A" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Modern High-Ceiling Window on Left Gable */}
      <path
        d="M170 120 H270 V195 H170 Z"
        stroke="#373F3A"
        strokeWidth="1.25"
      />
      <line x1="220" y1="120" x2="220" y2="195" stroke="#373F3A" strokeWidth="1" />
      <line x1="170" y1="155" x2="270" y2="155" stroke="#373F3A" strokeWidth="1" />

      {/* Central Modern Connector Roof & Pergola */}
      <line x1="320" y1="130" x2="480" y2="130" stroke="#A9C9AC" strokeWidth="1.5" />
      <path d="M480 210 V130" stroke="#373F3A" strokeWidth="1.5" />
      <line x1="360" y1="210" x2="360" y2="130" stroke="#373F3A" strokeWidth="1" />
      <line x1="420" y1="210" x2="420" y2="130" stroke="#373F3A" strokeWidth="1" />
      <line x1="340" y1="115" x2="460" y2="115" stroke="#373F3A" strokeWidth="1" strokeDasharray="3 3" />

      {/* Right Modern Two-Story Pavilion */}
      <path
        d="M480 210 V80 L620 80 L680 120 V210"
        stroke="#A9C9AC"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Overhanging modern flat roofline */}
      <line x1="460" y1="80" x2="640" y2="80" stroke="#A9C9AC" strokeWidth="2" strokeLinecap="round" />

      {/* Upper Architectural Balcony Window */}
      <rect x="510" y="100" width="90" height="40" stroke="#373F3A" strokeWidth="1.25" rx="2" />
      <line x1="555" y1="100" x2="555" y2="140" stroke="#373F3A" strokeWidth="1" />

      {/* Lower Glass Entry Door */}
      <path d="M530 210 V160 H570 V210" stroke="#A9C9AC" strokeWidth="1.5" />
      <circle cx="563" cy="185" r="1.5" fill="#A9C9AC" />

      {/* Refined Botanical / Foliage Elements (Left Side Planter) */}
      <path
        d="M70 210 Q65 170 90 155 Q95 185 85 210"
        stroke="#52A88B"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M85 190 Q110 175 110 160 Q95 175 85 190"
        stroke="#52A88B"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M60 210 Q45 185 60 170 Q65 195 65 210"
        stroke="#373F3A"
        strokeWidth="1"
        fill="none"
      />

      {/* Botanical Accent (Right Garden Edge) */}
      <path
        d="M710 210 Q700 165 730 150 Q740 185 725 210"
        stroke="#52A88B"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M725 190 Q750 170 755 155 Q735 175 725 190"
        stroke="#52A88B"
        strokeWidth="1.25"
        fill="none"
      />

      {/* Subtle Star/Sun Geometry */}
      <circle cx="680" cy="50" r="14" stroke="#373F3A" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="680" cy="50" r="4" fill="#A9C9AC" />
    </svg>
  );
}
