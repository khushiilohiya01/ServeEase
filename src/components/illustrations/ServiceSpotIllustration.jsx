import { memo } from 'react';

/**
 * ServiceSpotIllustration
 * Architectural line-art spot illustrations matching the Hero 2BHK cutaway.
 * Palette: Dark green outlines (#173D32), soft green fills (#A9C9AC, #E3EDE2), off-white highlights.
 * All illustrations feature subtle hover micro-animations (disabled under prefers-reduced-motion).
 */

export const ServiceSpotIllustration = memo(function ServiceSpotIllustration({
  serviceId = '',
  category = 'ac',
  className = '',
  aspect = 'aspect-16/10',
}) {
  // Normalize IDs
  const normId = (serviceId || '').toLowerCase().replace(/_/g, '-');
  const normCat = (category || 'ac').toLowerCase().replace(/_/g, '-');

  // Match specific service first, else fall back to category
  let illustrationType = normCat;

  if (normId.includes('ac-service') || normId.includes('jet-wash') || normId.includes('ac-gas')) {
    illustrationType = 'ac-jet-wash';
  } else if (normId.includes('geyser')) {
    illustrationType = 'geyser';
  } else if (normId.includes('chimney')) {
    illustrationType = 'chimney';
  } else if (normId.includes('tap') || normId.includes('faucet')) {
    illustrationType = 'tap-leaking';
  } else if (normId.includes('cockroach') || normId.includes('pest')) {
    illustrationType = 'cockroach-control';
  } else if (normId.includes('full-home-cleaning') || normId.includes('move-in')) {
    illustrationType = 'full-home-cleaning';
  } else if (normId.includes('ro') || normId.includes('purifier')) {
    illustrationType = 'ro-purifier';
  } else if (normId.includes('washing-machine')) {
    illustrationType = 'washing-machine';
  } else if (normId.includes('fan')) {
    illustrationType = 'fan';
  } else if (normId.includes('tv')) {
    illustrationType = 'tv-mounting';
  } else if (normId.includes('lock')) {
    illustrationType = 'door-lock';
  } else if (normId.includes('sofa') || normId.includes('couch')) {
    illustrationType = 'sofa';
  } else if (normId.includes('drain')) {
    illustrationType = 'drain';
  }

  return (
    <div
      className={`relative ${aspect} bg-[#FAFBF8] border border-[#DDE4DB]/70 rounded-xl flex items-center justify-center p-2.5 overflow-hidden select-none transition-colors duration-200 group-hover:bg-[#F4F6F2] ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .spot-anim-air,
          .spot-anim-drip,
          .spot-anim-spin,
          .spot-anim-pulse,
          .spot-anim-hover {
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 120 84"
        className="w-full h-full max-h-full max-w-full drop-shadow-2xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderIllustration(illustrationType)}
      </svg>
    </div>
  );
});

function renderIllustration(type) {
  switch (type) {
    // 1. AC / AC JET WASH
    case 'ac-jet-wash':
    case 'ac':
      return (
        <g>
          {/* Wall mount backplate */}
          <rect x="18" y="22" width="84" height="28" rx="6" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          <line x1="22" y1="38" x2="98" y2="38" stroke="#173D32" strokeWidth="1.5" />
          <circle cx="92" cy="30" r="2.5" fill="#367A55" />
          {/* Intake grille lines */}
          <line x1="26" y1="26" x2="48" y2="26" stroke="#DDE4DB" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="26" y1="29" x2="48" y2="29" stroke="#DDE4DB" strokeWidth="1.5" strokeLinecap="round" />
          {/* Louver flap */}
          <rect x="24" y="44" width="72" height="4" rx="2" fill="#E8EDE7" stroke="#173D32" strokeWidth="1.2" />
          {/* Airflow waves with hover micro-motion */}
          <g className="spot-anim-air transition-transform duration-300 ease-out group-hover:translate-y-1">
            <path d="M 32,54 Q 40,65 35,76" stroke="#367A55" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M 60,54 Q 68,65 63,76" stroke="#173D32" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M 88,54 Q 96,65 91,76" stroke="#367A55" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          </g>
        </g>
      );

    // 2. GEYSER
    case 'geyser':
      return (
        <g>
          {/* Cylindrical Geyser Tank */}
          <rect x="42" y="12" width="36" height="52" rx="12" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          {/* Top bracket */}
          <rect x="52" y="8" width="16" height="5" rx="2" fill="#173D32" />
          {/* Indicator LEDs */}
          <circle cx="60" cy="24" r="2.5" fill="#D97706" />
          <circle cx="60" cy="32" r="2.5" fill="#367A55" className="transition-all duration-300 group-hover:scale-125" />
          {/* Temperature dial ring */}
          <circle cx="60" cy="44" r="5" fill="#E8EDE7" stroke="#173D32" strokeWidth="1.5" />
          <line x1="60" y1="44" x2="63" y2="41" stroke="#173D32" strokeWidth="1.5" strokeLinecap="round" />
          {/* Inlet & outlet pipes */}
          <line x1="48" y1="64" x2="48" y2="76" stroke="#173D32" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="64" x2="72" y2="76" stroke="#173D32" strokeWidth="2.5" strokeLinecap="round" />
          {/* Soft steam wave */}
          <path
            d="M 56,4 Q 60,0 64,4"
            stroke="#A9C9AC"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </g>
      );

    // 3. CHIMNEY
    case 'chimney':
      return (
        <g>
          {/* Chimney Shaft */}
          <rect x="48" y="10" width="24" height="22" fill="#173D32" />
          {/* Wide Stainless Hood */}
          <polygon points="32,32 88,32 100,52 20,52" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          {/* Baffle filter mesh area */}
          <rect x="28" y="52" width="64" height="7" rx="2" fill="#A9C9AC" stroke="#173D32" strokeWidth="1.8" />
          {/* Suction breeze lines */}
          <g className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <path d="M 38,72 Q 44,64 42,58" stroke="#367A55" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 60,74 Q 60,65 60,58" stroke="#173D32" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 82,72 Q 76,64 78,58" stroke="#367A55" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>
      );

    // 4. TAP LEAKING / PLUMBER
    case 'tap-leaking':
    case 'plumber':
      return (
        <g>
          {/* Pipe connection plate */}
          <rect x="22" y="24" width="6" height="18" rx="2" fill="#173D32" />
          {/* Swan neck tap pipe */}
          <path
            d="M 28,33 L 56,33 Q 72,33 72,48 L 72,56"
            fill="none"
            stroke="#173D32"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Tap quarter-turn lever handle */}
          <rect x="46" y="24" width="16" height="5" rx="2.5" fill="#A9C9AC" stroke="#173D32" strokeWidth="1.8" />
          <line x1="54" y1="29" x2="54" y2="33" stroke="#173D32" strokeWidth="2.2" />
          {/* Aerator spout tip */}
          <rect x="67" y="56" width="10" height="5" rx="1.5" fill="#FFFFFF" stroke="#173D32" strokeWidth="2" />
          {/* Water droplet with hover drip */}
          <circle
            cx="72"
            cy="68"
            r="3"
            fill="#367A55"
            className="transition-all duration-300 ease-in group-hover:translate-y-2 group-hover:opacity-75"
          />
          {/* Water ripple at base */}
          <ellipse cx="72" cy="77" rx="14" ry="3" fill="#E8EDE7" stroke="#173D32" strokeWidth="1.2" />
        </g>
      );

    // 5. COCKROACH CONTROL / PEST CONTROL
    case 'cockroach-control':
    case 'pest-control':
      return (
        <g>
          {/* Protective Shield Emblem */}
          <path
            d="M 60,10 L 86,22 C 86,52 60,68 60,74 C 60,68 34,52 34,22 Z"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          {/* Inner soft green accent shield */}
          <path
            d="M 60,18 L 80,28 C 80,50 60,62 60,66 C 60,62 40,50 40,28 Z"
            fill="#E3EDE2"
            stroke="#173D32"
            strokeWidth="1.2"
          />
          {/* Gel applicator syringe / check symbol */}
          <path
            d="M 48,40 L 56,48 L 74,30"
            fill="none"
            stroke="#173D32"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:scale-110 origin-center"
          />
          {/* Barrier dots */}
          <circle cx="32" cy="46" r="2" fill="#367A55" />
          <circle cx="88" cy="46" r="2" fill="#367A55" />
        </g>
      );

    // 6. FULL HOME CLEANING / CLEANING
    case 'full-home-cleaning':
    case 'cleaning':
      return (
        <g>
          {/* Cleaning Spray bottle */}
          <rect x="30" y="32" width="22" height="38" rx="6" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          <rect x="36" y="22" width="10" height="10" fill="#E8EDE7" stroke="#173D32" strokeWidth="2" />
          {/* Trigger head */}
          <path d="M 32,24 L 22,28 L 22,33 L 34,31" fill="#A9C9AC" stroke="#173D32" strokeWidth="1.8" />
          <rect x="44" y="16" width="12" height="8" rx="2" fill="#173D32" />
          {/* Liquid level fill */}
          <rect x="32" y="48" width="18" height="20" rx="3" fill="#A9C9AC" opacity="0.6" />
          {/* Floor scrubber / buffer disc */}
          <ellipse cx="80" cy="58" rx="22" ry="10" fill="#E3EDE2" stroke="#173D32" strokeWidth="2.2" />
          <line x1="80" y1="58" x2="80" y2="24" stroke="#173D32" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="24" x2="90" y2="24" stroke="#173D32" strokeWidth="3" strokeLinecap="round" />
          {/* Twinkling sparkles with hover transition */}
          <path
            d="M 68,14 L 70,8 L 72,14 L 78,16 L 72,18 L 70,24 L 68,18 L 62,16 Z"
            fill="#367A55"
            className="transition-transform duration-300 group-hover:scale-125 origin-center"
          />
          <circle cx="100" cy="38" r="3" fill="#D97706" />
        </g>
      );

    // 7. RO WATER PURIFIER
    case 'ro-purifier':
      return (
        <g>
          {/* Wall-mounted RO Cabinet */}
          <rect x="38" y="14" width="44" height="60" rx="8" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          {/* Top header with LEDs */}
          <rect x="42" y="18" width="36" height="14" rx="4" fill="#E8EDE7" stroke="#173D32" strokeWidth="1.5" />
          <circle cx="50" cy="25" r="2" fill="#367A55" />
          <circle cx="58" cy="25" r="2" fill="#367A55" />
          <circle cx="66" cy="25" r="2" fill="#173D32" />
          {/* Transparent Water Reservoir */}
          <rect x="44" y="36" width="32" height="26" rx="4" fill="#A9C9AC" opacity="0.7" stroke="#173D32" strokeWidth="1.5" />
          {/* Water wave inside */}
          <path
            d="M 46,46 Q 52,42 60,46 Q 68,50 74,46"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
          {/* Purified Dispenser Tap */}
          <path d="M 60,62 L 60,67 L 54,67" fill="none" stroke="#173D32" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="54" cy="71" r="1.5" fill="#367A55" />
        </g>
      );

    // 8. WASHING MACHINE / APPLIANCES
    case 'washing-machine':
    case 'appliances':
      return (
        <g>
          {/* Washing Machine Body */}
          <rect x="32" y="12" width="56" height="62" rx="8" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          {/* Top Control Panel */}
          <rect x="32" y="12" width="56" height="14" rx="4" fill="#E8EDE7" stroke="#173D32" strokeWidth="1.8" />
          <circle cx="44" cy="19" r="3" fill="#173D32" />
          <line x1="56" y1="17" x2="78" y2="17" stroke="#8D9B91" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="56" y1="21" x2="72" y2="21" stroke="#8D9B91" strokeWidth="1.5" strokeLinecap="round" />
          {/* Circular Front Load Drum Door */}
          <circle cx="60" cy="46" r="18" fill="#F4F6F2" stroke="#173D32" strokeWidth="2.2" />
          <circle cx="60" cy="46" r="13" fill="#A9C9AC" opacity="0.6" stroke="#173D32" strokeWidth="1.5" />
          {/* Rotating wash wave */}
          <path
            d="M 52,47 Q 60,42 68,47"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="transition-transform duration-300 group-hover:rotate-180 origin-center"
          />
          {/* Chrome door handle */}
          <rect x="74" y="43" width="3" height="6" rx="1.5" fill="#173D32" />
        </g>
      );

    // 9. CEILING FAN / ELECTRICIAN
    case 'fan':
    case 'electrician':
      return (
        <g>
          {/* Downrod pipe */}
          <line x1="60" y1="8" x2="60" y2="34" stroke="#173D32" strokeWidth="3" strokeLinecap="round" />
          {/* Ceiling canopy cover */}
          <path d="M 50,12 L 70,12 L 64,8 L 56,8 Z" fill="#173D32" />
          {/* Motor Hub & Rotating 3 Blades */}
          <g
            className="transition-transform duration-700 ease-out group-hover:rotate-180"
            style={{ transformOrigin: '60px 42px' }}
          >
            <circle cx="60" cy="42" r="8" fill="#173D32" />
            {/* Blade 1 (Left) */}
            <path d="M 54,42 Q 22,34 8,43 Q 22,50 54,44 Z" fill="#367A55" stroke="#173D32" strokeWidth="1.5" />
            {/* Blade 2 (Right) */}
            <path d="M 66,42 Q 98,34 112,43 Q 98,50 66,44 Z" fill="#367A55" stroke="#173D32" strokeWidth="1.5" />
            {/* Blade 3 (Down) */}
            <path d="M 60,50 Q 52,70 60,80 Q 68,70 60,50 Z" fill="#367A55" stroke="#173D32" strokeWidth="1.5" />
            <circle cx="60" cy="42" r="3" fill="#FFFFFF" />
          </g>
        </g>
      );

    // 10. TV MOUNTING / ODD JOBS
    case 'tv-mounting':
    case 'odd-jobs':
      return (
        <g>
          {/* Wall bracket backplate */}
          <rect x="36" y="24" width="48" height="32" rx="4" fill="#DDE4DB" stroke="#173D32" strokeWidth="1.8" />
          {/* Slim Television Screen */}
          <rect x="18" y="16" width="84" height="48" rx="6" fill="#191E1B" stroke="#173D32" strokeWidth="2.2" />
          {/* Inner display bezel */}
          <rect x="22" y="20" width="76" height="40" rx="3" fill="#3B4841" />
          {/* Spirit level tool indicator */}
          <g className="transition-transform duration-200 group-hover:translate-y-1">
            <rect x="42" y="68" width="36" height="8" rx="4" fill="#FFFFFF" stroke="#173D32" strokeWidth="1.5" />
            <circle cx="60" cy="72" r="2.5" fill="#367A55" />
          </g>
          {/* Glass reflection streak */}
          <line x1="28" y1="24" x2="48" y2="54" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        </g>
      );

    // 11. CARPENTER / WOODWORK
    case 'carpenter':
    case 'door-lock':
      return (
        <g>
          {/* Solid Wooden Plinth */}
          <rect x="24" y="44" width="72" height="26" rx="4" fill="#E8EDE7" stroke="#173D32" strokeWidth="2.2" />
          <line x1="32" y1="52" x2="88" y2="52" stroke="#DDE4DB" strokeWidth="1.5" />
          <line x1="32" y1="60" x2="88" y2="60" stroke="#DDE4DB" strokeWidth="1.5" />
          {/* Steel Carpenter Hammer */}
          <g
            className="transition-transform duration-300 ease-out group-hover:-rotate-12"
            style={{ transformOrigin: '65px 44px' }}
          >
            {/* Wooden Handle */}
            <rect x="62" y="24" width="6" height="32" rx="2" fill="#C27854" stroke="#173D32" strokeWidth="1.8" />
            {/* Steel Head with Claw */}
            <path d="M 52,18 L 78,18 L 82,24 L 48,24 Z" fill="#FFFFFF" stroke="#173D32" strokeWidth="2" />
            <path d="M 78,18 Q 88,20 86,28" fill="none" stroke="#173D32" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Brass Wood Screw */}
          <rect x="36" y="32" width="4" height="12" fill="#D97706" />
          <line x1="33" y1="32" x2="43" y2="32" stroke="#173D32" strokeWidth="1.5" />
        </g>
      );

    // 12. PAINTING
    case 'painting':
      return (
        <g>
          {/* Fresh Painted Wall Swatch */}
          <rect x="24" y="16" width="72" height="44" rx="8" fill="#E3EDE2" stroke="#173D32" strokeWidth="2" />
          <path d="M 32,24 Q 60,30 88,24" stroke="#A9C9AC" strokeWidth="3" strokeLinecap="round" />
          <path d="M 32,34 Q 60,40 88,34" stroke="#367A55" strokeWidth="3" strokeLinecap="round" />
          {/* Paint Roller Tool */}
          <g className="transition-transform duration-300 ease-out group-hover:-translate-y-2">
            {/* Roller Cylinder */}
            <rect x="42" y="38" width="40" height="12" rx="4" fill="#367A55" stroke="#173D32" strokeWidth="2" />
            {/* Metal Arm */}
            <path d="M 82,44 L 88,44 L 88,60 L 64,60 L 64,74" fill="none" stroke="#173D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Grip handle */}
            <rect x="61" y="66" width="6" height="12" rx="2" fill="#C27854" stroke="#173D32" strokeWidth="1.8" />
          </g>
        </g>
      );

    // 13. KITCHEN / COOKING
    case 'kitchen':
      return (
        <g>
          {/* Granite Counter Strip */}
          <rect x="18" y="52" width="84" height="18" rx="4" fill="#191E1B" />
          {/* Gas Stove base */}
          <rect x="28" y="44" width="64" height="10" rx="3" fill="#4A564F" stroke="#173D32" strokeWidth="1.8" />
          {/* Left Burner + Flame */}
          <ellipse cx="44" cy="44" rx="8" ry="3.5" fill="#DDE4DB" stroke="#173D32" strokeWidth="1.5" />
          <path
            d="M 44,40 Q 42,32 44,28 Q 46,32 44,40"
            fill="#367A55"
            stroke="#173D32"
            strokeWidth="1.2"
            className="transition-transform duration-200 group-hover:scale-125 origin-bottom"
          />
          {/* Right Burner + Flame */}
          <ellipse cx="76" cy="44" rx="8" ry="3.5" fill="#DDE4DB" stroke="#173D32" strokeWidth="1.5" />
          <path
            d="M 76,40 Q 74,32 76,28 Q 78,32 76,40"
            fill="#D97706"
            stroke="#173D32"
            strokeWidth="1.2"
            className="transition-transform duration-200 group-hover:scale-125 origin-bottom"
          />
          {/* Front Knobs */}
          <circle cx="44" cy="49" r="2" fill="#FFFFFF" />
          <circle cx="76" cy="49" r="2" fill="#FFFFFF" />
        </g>
      );

    // 14. SOFA / HALL
    case 'sofa':
    case 'hall':
      return (
        <g>
          {/* 2-Seater Sofa Frame */}
          <rect x="24" y="32" width="72" height="36" rx="8" fill="#DDE4DB" stroke="#173D32" strokeWidth="2.2" />
          {/* Armrests */}
          <rect x="18" y="38" width="10" height="28" rx="5" fill="#A9C9AC" stroke="#173D32" strokeWidth="1.8" />
          <rect x="92" y="38" width="10" height="28" rx="5" fill="#A9C9AC" stroke="#173D32" strokeWidth="1.8" />
          {/* Cushions */}
          <rect x="30" y="38" width="28" height="26" rx="5" fill="#FFFFFF" stroke="#173D32" strokeWidth="1.8" />
          <rect x="62" y="38" width="28" height="26" rx="5" fill="#FFFFFF" stroke="#173D32" strokeWidth="1.8" />
          {/* Accent Throw Cushion */}
          <rect
            x="36"
            y="42"
            width="14"
            height="14"
            rx="3"
            fill="#367A55"
            stroke="#173D32"
            strokeWidth="1.2"
            className="transition-transform duration-200 group-hover:scale-110"
          />
        </g>
      );

    // 15. DRAIN
    case 'drain':
      return (
        <g>
          {/* Floor tile boundary */}
          <rect x="24" y="20" width="72" height="52" rx="8" fill="#FFFFFF" stroke="#173D32" strokeWidth="2" />
          {/* Circular Chrome Floor Jali */}
          <circle cx="60" cy="46" r="20" fill="#E8EDE7" stroke="#173D32" strokeWidth="2.2" />
          {/* Slotted drainage holes */}
          <line x1="50" y1="46" x2="70" y2="46" stroke="#173D32" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="52" y1="40" x2="68" y2="40" stroke="#173D32" strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="52" x2="68" y2="52" stroke="#173D32" strokeWidth="2" strokeLinecap="round" />
          {/* Swirling water motion on hover */}
          <path
            d="M 44,32 Q 60,24 76,32"
            stroke="#367A55"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            className="transition-transform duration-300 group-hover:translate-y-1"
          />
        </g>
      );

    // DEFAULT UNIVERSAL TOOLKIT / SERVICE EMBLEM
    default:
      return (
        <g>
          <rect x="28" y="24" width="64" height="44" rx="8" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.2" />
          <rect x="44" y="16" width="32" height="10" rx="3" fill="#A9C9AC" stroke="#173D32" strokeWidth="2" />
          <circle cx="60" cy="46" r="10" fill="#E3EDE2" stroke="#173D32" strokeWidth="2" />
          <path d="M 56,46 L 64,46 M 60,42 L 60,50" stroke="#173D32" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
  }
}
