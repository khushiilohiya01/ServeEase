import { memo } from 'react';

/**
 * 2BHK Flat Cutaway SVG Illustration for Hero
 * - Room labels min 14px for crisp legibility
 * - Crisp line-art with reinforced stroke widths
 * - Redrawn wall-mounted shower with pipe & flange in bathroom
 * - Ambient motion: slow rotating ceiling fan (~8s), soft pulsating AC air, occasional tap drip
 * - All animations strictly disabled under prefers-reduced-motion
 * - Accessible keyboard navigation with visible focus rings
 */
export const FlatCutawaySvg = memo(function FlatCutawaySvg({
  selectedRoom = null,
  onSelectRoom,
}) {
  const isRoomActive = (id) => selectedRoom === id;

  const handleRoomClick = (id) => {
    // Tapping the active room again deselects it
    if (selectedRoom === id) {
      onSelectRoom(null);
    } else {
      onSelectRoom(id);
    }
  };

  const handleRoomKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRoomClick(id);
    }
  };

  return (
    <div className="relative w-full aspect-16/10 select-none">
      <style>{`
        @keyframes hero-fan-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hero-ac-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
        @keyframes hero-water-drip {
          0%, 65% { opacity: 0; transform: translateY(0); }
          72% { opacity: 0.9; transform: translateY(2px); }
          86% { opacity: 0.9; transform: translateY(28px); }
          90%, 100% { opacity: 0; transform: translateY(32px); }
        }
        .hero-fan-blades {
          transform-origin: 580px 320px;
          animation: hero-fan-spin 8s linear infinite;
        }
        .hero-ac-flow {
          animation: hero-ac-pulse 3s ease-in-out infinite;
        }
        .hero-tap-drop {
          animation: hero-water-drip 4.5s ease-in infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fan-blades,
          .hero-ac-flow,
          .hero-tap-drop {
            animation: none !important;
          }
          .hero-tap-drop {
            display: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 880 540"
        className="w-full h-full drop-shadow-sm"
        role="img"
        aria-label="2BHK flat interactive architectural cutaway"
      >
        <defs>
          {/* Pattern for Window Grills */}
          <pattern
            id="hero-window-grill"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0,0 L 12,12 M 12,0 L 0,12"
              fill="none"
              stroke="#8D9B91"
              strokeWidth="1"
            />
          </pattern>

          {/* AC airflow gradient */}
          <linearGradient id="hero-ac-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#245544" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#245544" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. OUTER SLABS & STRUCTURAL WALLS */}
        <rect
          x="12"
          y="12"
          width="856"
          height="516"
          rx="18"
          fill="#FAFBF8"
          stroke="#173D32"
          strokeWidth="3.5"
        />

        {/* Horizontal floor dividing slab */}
        <rect
          x="12"
          y="266"
          width="856"
          height="12"
          fill="#DDE4DB"
          stroke="#173D32"
          strokeWidth="2"
        />

        {/* Vertical dividing walls upper floor */}
        <rect
          x="368"
          y="12"
          width="10"
          height="254"
          fill="#DDE4DB"
          stroke="#173D32"
          strokeWidth="2"
        />
        <rect
          x="618"
          y="12"
          width="10"
          height="254"
          fill="#DDE4DB"
          stroke="#173D32"
        />

        {/* Vertical dividing wall lower floor (Kitchen vs Hall) */}
        <rect
          x="368"
          y="278"
          width="10"
          height="250"
          fill="#DDE4DB"
          stroke="#173D32"
          strokeWidth="2"
        />

        {/* ========================================================
            ZONE 1: BEDROOM (Upper Left: x 22 to 365, y 22 to 262)
        ======================================================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select Bedroom zone"
          aria-pressed={isRoomActive('bedroom')}
          onClick={() => handleRoomClick('bedroom')}
          onKeyDown={(e) => handleRoomKeyDown(e, 'bedroom')}
          className="cursor-pointer focus:outline-none group"
        >
          {/* Room Backdrop */}
          <rect
            x="20"
            y="20"
            width="345"
            height="242"
            rx="12"
            fill={isRoomActive('bedroom') ? '#E3EDE2' : '#FFFFFF'}
            stroke={isRoomActive('bedroom') ? '#173D32' : 'transparent'}
            strokeWidth={isRoomActive('bedroom') ? '3' : '1'}
            className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
          />

          {/* Window with Indian Grills */}
          <rect
            x="36"
            y="44"
            width="88"
            height="72"
            rx="4"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="48"
            width="80"
            height="64"
            fill="url(#hero-window-grill)"
          />

          {/* Split AC Unit mounted high on wall */}
          <rect
            x="175"
            y="40"
            width="128"
            height="34"
            rx="6"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="182"
            y1="64"
            x2="295"
            y2="64"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <circle cx="288" cy="52" r="3" fill="#367A55" />

          {/* Soft pulsating AC Airflow Waves */}
          <g className="hero-ac-flow">
            <path
              d="M 195,78 Q 208,98 200,118"
              stroke="#245544"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 3"
            />
            <path
              d="M 239,78 Q 252,98 244,118"
              stroke="#245544"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 3"
            />
            <path
              d="M 283,78 Q 296,98 288,118"
              stroke="#245544"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 3"
            />
          </g>

          {/* Wooden Wardrobe / Almirah */}
          <rect
            x="36"
            y="136"
            width="64"
            height="116"
            rx="4"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="68"
            y1="136"
            x2="68"
            y2="252"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <line
            x1="62"
            y1="185"
            x2="62"
            y2="202"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="74"
            y1="185"
            x2="74"
            y2="202"
            stroke="#173D32"
            strokeWidth="2.2"
          />

          {/* Double Bed with Pillows and Blanket */}
          <rect
            x="130"
            y="166"
            width="196"
            height="86"
            rx="6"
            fill="#DDE4DB"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <rect
            x="312"
            y="142"
            width="18"
            height="110"
            rx="4"
            fill="#8D9B91"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          {/* Pillows */}
          <rect
            x="248"
            y="176"
            width="52"
            height="30"
            rx="5"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <rect
            x="248"
            y="214"
            width="52"
            height="30"
            rx="5"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          {/* Throw blanket */}
          <rect
            x="130"
            y="166"
            width="74"
            height="86"
            rx="5"
            fill="#A9C9AC"
            opacity="0.65"
            stroke="#173D32"
            strokeWidth="2"
          />

          {/* Room Tag Indicator — Min 14px Font for High Legibility */}
          <g transform="translate(36, 32)">
            <rect
              width="104"
              height="28"
              rx="14"
              fill={isRoomActive('bedroom') ? '#173D32' : '#FFFFFF'}
              stroke="#173D32"
              strokeWidth="2"
              className="drop-shadow-2xs"
            />
            <text
              x="52"
              y="19"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isRoomActive('bedroom') ? '#FFFFFF' : '#173D32'}
            >
              Bedroom
            </text>
          </g>
        </g>

        {/* ========================================================
            ZONE 2: BATHROOM (Upper Center: x 382 to 614, y 20 to 262)
        ======================================================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select Bathroom zone"
          aria-pressed={isRoomActive('bathroom')}
          onClick={() => handleRoomClick('bathroom')}
          onKeyDown={(e) => handleRoomKeyDown(e, 'bathroom')}
          className="cursor-pointer focus:outline-none group"
        >
          <rect
            x="382"
            y="20"
            width="232"
            height="242"
            rx="12"
            fill={isRoomActive('bathroom') ? '#E3EDE2' : '#FFFFFF'}
            stroke={isRoomActive('bathroom') ? '#173D32' : 'transparent'}
            strokeWidth={isRoomActive('bathroom') ? '3' : '1'}
            className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
          />

          {/* Wall-mounted Cylindrical Geyser with hot/cold pipes */}
          <rect
            x="398"
            y="42"
            width="58"
            height="78"
            rx="16"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="410"
            y1="120"
            x2="410"
            y2="142"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="444"
            y1="120"
            x2="444"
            y2="142"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <circle cx="427" cy="62" r="3.5" fill="#367A55" />
          <circle cx="427" cy="76" r="3.5" fill="#D97706" />

          {/* Clearly Wall-Mounted Shower Head with Pipe & Flange */}
          {/* Wall mounting plate / flange on right wall */}
          <rect
            x="604"
            y="48"
            width="6"
            height="18"
            rx="2"
            fill="#173D32"
          />
          {/* Shower arm pipe extending horizontally from wall and bending downward */}
          <path
            d="M 604,57 L 548,57 Q 532,57 532,74 L 532,84"
            fill="none"
            stroke="#173D32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Shower Head Bell / Rosette (facing downward) */}
          <polygon
            points="518,84 546,84 540,94 524,94"
            fill="#173D32"
          />
          <line
            x1="522"
            y1="94"
            x2="542"
            y2="94"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Spray water droplets */}
          <circle cx="526" cy="104" r="1.8" fill="#367A55" />
          <circle cx="532" cy="112" r="1.8" fill="#367A55" />
          <circle cx="538" cy="105" r="1.8" fill="#367A55" />

          {/* Washbasin with Mirror */}
          <rect
            x="465"
            y="126"
            width="48"
            height="52"
            rx="6"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2"
          />
          <path
            d="M 460,182 Q 489,204 518,182 Z"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          {/* Washbasin Tap with Ambient Single Drip */}
          <path
            d="M 489,182 L 489,165 Q 489,156 480,156"
            fill="none"
            stroke="#173D32"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Subtle Ambient Water Drip */}
          <circle
            cx="480"
            cy="166"
            r="2"
            fill="#367A55"
            className="hero-tap-drop"
          />

          {/* Authentic Indian Bathroom Bucket & Mug (Balti & Magga) */}
          <path
            d="M 536,214 L 582,214 L 574,254 L 544,254 Z"
            fill="#A9C9AC"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <ellipse cx="559" cy="214" rx="23" ry="5" fill="#8D9B91" />
          {/* Magga resting on bucket rim */}
          <rect
            x="572"
            y="202"
            width="20"
            height="20"
            rx="4"
            fill="#DDE4DB"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <path
            d="M 592,207 Q 600,212 592,217"
            fill="none"
            stroke="#173D32"
            strokeWidth="1.8"
          />

          {/* Room Tag Indicator */}
          <g transform="translate(395, 32)">
            <rect
              width="106"
              height="28"
              rx="14"
              fill={isRoomActive('bathroom') ? '#173D32' : '#FFFFFF'}
              stroke="#173D32"
              strokeWidth="2"
              className="drop-shadow-2xs"
            />
            <text
              x="53"
              y="19"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isRoomActive('bathroom') ? '#FFFFFF' : '#173D32'}
            >
              Bathroom
            </text>
          </g>
        </g>

        {/* ========================================================
            ZONE 3: BALCONY (Upper Right: x 632 to 864, y 20 to 262)
        ======================================================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select Balcony zone"
          aria-pressed={isRoomActive('balcony')}
          onClick={() => handleRoomClick('balcony')}
          onKeyDown={(e) => handleRoomKeyDown(e, 'balcony')}
          className="cursor-pointer focus:outline-none group"
        >
          <rect
            x="632"
            y="20"
            width="232"
            height="242"
            rx="12"
            fill={isRoomActive('balcony') ? '#E3EDE2' : '#FFFFFF'}
            stroke={isRoomActive('balcony') ? '#173D32' : 'transparent'}
            strokeWidth={isRoomActive('balcony') ? '3' : '1'}
            className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
          />

          {/* Open Balcony Grill Railing */}
          <line
            x1="642"
            y1="188"
            x2="854"
            y2="188"
            stroke="#173D32"
            strokeWidth="3.2"
          />
          <line
            x1="642"
            y1="254"
            x2="854"
            y2="254"
            stroke="#173D32"
            strokeWidth="3.2"
          />
          {[656, 684, 712, 740, 768, 796, 824, 848].map((xPos) => (
            <line
              key={xPos}
              x1={xPos}
              y1="188"
              x2={xPos}
              y2="254"
              stroke="#173D32"
              strokeWidth="2.2"
            />
          ))}

          {/* Scissor Clothes Drying Stand */}
          <line
            x1="655"
            y1="106"
            x2="742"
            y2="106"
            stroke="#173D32"
            strokeWidth="2.5"
          />
          <line
            x1="668"
            y1="106"
            x2="728"
            y2="184"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="728"
            y1="106"
            x2="668"
            y2="184"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          {/* Drying towel */}
          <rect
            x="680"
            y="108"
            width="38"
            height="36"
            rx="3"
            fill="#A9C9AC"
            stroke="#173D32"
            strokeWidth="1.8"
          />

          {/* Potted Green Plants (Tulsi in Terracotta Pot) */}
          <g transform="translate(768, 134)">
            <path
              d="M 12,28 L 38,28 L 32,54 L 18,54 Z"
              fill="#C27854"
              stroke="#173D32"
              strokeWidth="2.2"
            />
            <circle cx="16" cy="20" r="10" fill="#367A55" />
            <circle cx="30" cy="15" r="12" fill="#173D32" />
            <circle cx="37" cy="24" r="9" fill="#367A55" />
          </g>

          {/* Pigeon Net Grid Mesh Indicator */}
          <rect
            x="644"
            y="48"
            width="212"
            height="134"
            fill="none"
            stroke="#A9C9AC"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.8"
          />

          {/* Room Tag Indicator */}
          <g transform="translate(645, 32)">
            <rect
              width="100"
              height="28"
              rx="14"
              fill={isRoomActive('balcony') ? '#173D32' : '#FFFFFF'}
              stroke="#173D32"
              strokeWidth="2"
              className="drop-shadow-2xs"
            />
            <text
              x="50"
              y="19"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isRoomActive('balcony') ? '#FFFFFF' : '#173D32'}
            >
              Balcony
            </text>
          </g>
        </g>

        {/* ========================================================
            ZONE 4: MODULAR KITCHEN (Lower Left: x 20 to 365, y 280 to 522)
        ======================================================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select Kitchen zone"
          aria-pressed={isRoomActive('kitchen')}
          onClick={() => handleRoomClick('kitchen')}
          onKeyDown={(e) => handleRoomKeyDown(e, 'kitchen')}
          className="cursor-pointer focus:outline-none group"
        >
          <rect
            x="20"
            y="280"
            width="345"
            height="242"
            rx="12"
            fill={isRoomActive('kitchen') ? '#E3EDE2' : '#FFFFFF'}
            stroke={isRoomActive('kitchen') ? '#173D32' : 'transparent'}
            strokeWidth={isRoomActive('kitchen') ? '3' : '1'}
            className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
          />

          {/* Upper Cabinets */}
          <rect
            x="36"
            y="296"
            width="170"
            height="52"
            rx="4"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="92"
            y1="296"
            x2="92"
            y2="348"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <line
            x1="150"
            y1="296"
            x2="150"
            y2="348"
            stroke="#173D32"
            strokeWidth="1.8"
          />

          {/* Kitchen Chimney with Stainless Steel Hood */}
          <polygon
            points="225,296 295,296 306,338 214,338"
            fill="#173D32"
          />
          <rect
            x="245"
            y="282"
            width="32"
            height="15"
            fill="#173D32"
          />
          <line
            x1="220"
            y1="340"
            x2="300"
            y2="340"
            stroke="#DDE4DB"
            strokeWidth="2.5"
          />

          {/* Wall-Mounted Compact RO Purifier */}
          <rect
            x="314"
            y="312"
            width="42"
            height="62"
            rx="6"
            fill="#FFFFFF"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <rect
            x="320"
            y="338"
            width="30"
            height="26"
            rx="4"
            fill="#A9C9AC"
            opacity="0.85"
          />
          <circle cx="335" cy="325" r="3" fill="#367A55" />

          {/* Granite Countertop */}
          <rect
            x="36"
            y="412"
            width="320"
            height="18"
            rx="3"
            fill="#191E1B"
          />

          {/* 3-Burner Gas Stove */}
          <rect
            x="220"
            y="400"
            width="82"
            height="14"
            rx="3"
            fill="#4A564F"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <ellipse cx="238" cy="406" rx="6" ry="3" fill="#DDE4DB" />
          <ellipse cx="261" cy="406" rx="7" ry="3.5" fill="#DDE4DB" />
          <ellipse cx="284" cy="406" rx="6" ry="3" fill="#DDE4DB" />

          {/* Stainless Steel Sink & Faucet */}
          <rect
            x="64"
            y="414"
            width="64"
            height="14"
            rx="3"
            fill="#DDE4DB"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <path
            d="M 96,414 L 96,386 Q 96,376 85,376"
            fill="none"
            stroke="#173D32"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Lower Modular Drawers */}
          <rect
            x="36"
            y="430"
            width="320"
            height="76"
            rx="4"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <line
            x1="36"
            y1="468"
            x2="356"
            y2="468"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <line
            x1="142"
            y1="430"
            x2="142"
            y2="506"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <line
            x1="248"
            y1="430"
            x2="248"
            y2="506"
            stroke="#173D32"
            strokeWidth="1.8"
          />

          {/* Room Tag Indicator */}
          <g transform="translate(36, 292)">
            <rect
              width="98"
              height="28"
              rx="14"
              fill={isRoomActive('kitchen') ? '#173D32' : '#FFFFFF'}
              stroke="#173D32"
              strokeWidth="2"
              className="drop-shadow-2xs"
            />
            <text
              x="49"
              y="19"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isRoomActive('kitchen') ? '#FFFFFF' : '#173D32'}
            >
              Kitchen
            </text>
          </g>
        </g>

        {/* ========================================================
            ZONE 5: LIVING ROOM / HALL (Lower Right: x 382 to 864, y 280 to 522)
        ======================================================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Select Hall zone"
          aria-pressed={isRoomActive('hall')}
          onClick={() => handleRoomClick('hall')}
          onKeyDown={(e) => handleRoomKeyDown(e, 'hall')}
          className="cursor-pointer focus:outline-none group"
        >
          <rect
            x="382"
            y="280"
            width="482"
            height="242"
            rx="12"
            fill={isRoomActive('hall') ? '#E3EDE2' : '#FFFFFF'}
            stroke={isRoomActive('hall') ? '#173D32' : 'transparent'}
            strokeWidth={isRoomActive('hall') ? '3' : '1'}
            className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
          />

          {/* Ceiling Fan Downrod & Rotating 3 Aerodynamic Blades */}
          {/* Static Downrod */}
          <line
            x1="580"
            y1="280"
            x2="580"
            y2="315"
            stroke="#173D32"
            strokeWidth="3.2"
          />

          {/* Rotating Motor & 3 Blades (~8s per rotation) */}
          <g className="hero-fan-blades">
            <circle cx="580" cy="320" r="11" fill="#173D32" />
            {/* Blade 1 (Left) */}
            <path
              d="M 570,320 Q 518,312 488,321 Q 518,328 570,323 Z"
              fill="#367A55"
              stroke="#173D32"
              strokeWidth="1.2"
            />
            {/* Blade 2 (Right) */}
            <path
              d="M 590,320 Q 642,312 672,321 Q 642,328 590,323 Z"
              fill="#367A55"
              stroke="#173D32"
              strokeWidth="1.2"
            />
            {/* Blade 3 (Downward) */}
            <path
              d="M 580,330 Q 574,364 580,384 Q 587,364 583,330 Z"
              fill="#367A55"
              stroke="#173D32"
              strokeWidth="1.2"
            />
          </g>

          {/* Wall Mounted Flat Screen TV */}
          <rect
            x="404"
            y="332"
            width="88"
            height="52"
            rx="4"
            fill="#191E1B"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <rect
            x="409"
            y="337"
            width="78"
            height="42"
            fill="#3B4841"
          />

          {/* 3-Seater Sofa / Couch with Accent Cushions */}
          <rect
            x="510"
            y="420"
            width="234"
            height="76"
            rx="12"
            fill="#DDE4DB"
            stroke="#173D32"
            strokeWidth="2.2"
          />
          <rect
            x="500"
            y="425"
            width="22"
            height="66"
            rx="8"
            fill="#A9C9AC"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <rect
            x="732"
            y="425"
            width="22"
            height="66"
            rx="8"
            fill="#A9C9AC"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          {/* Accent Cushions */}
          <rect
            x="532"
            y="430"
            width="32"
            height="32"
            rx="6"
            fill="#367A55"
            stroke="#173D32"
            strokeWidth="1.8"
          />
          <rect
            x="690"
            y="430"
            width="32"
            height="32"
            rx="6"
            fill="#367A55"
            stroke="#173D32"
            strokeWidth="1.8"
          />

          {/* Coffee Table in front of Sofa */}
          <rect
            x="572"
            y="476"
            width="114"
            height="24"
            rx="5"
            fill="#E8EDE7"
            stroke="#173D32"
            strokeWidth="2.2"
          />

          {/* Corner Potted Tall Indoor Plant */}
          <g transform="translate(795, 420)">
            <path
              d="M 12,30 L 38,30 L 32,70 L 18,70 Z"
              fill="#C27854"
              stroke="#173D32"
              strokeWidth="2.2"
            />
            <ellipse cx="25" cy="18" rx="15" ry="24" fill="#367A55" />
            <ellipse cx="12" cy="12" rx="13" ry="18" fill="#173D32" />
            <ellipse cx="38" cy="12" rx="13" ry="18" fill="#367A55" />
          </g>

          {/* Room Tag Indicator */}
          <g transform="translate(395, 292)">
            <rect
              width="82"
              height="28"
              rx="14"
              fill={isRoomActive('hall') ? '#173D32' : '#FFFFFF'}
              stroke="#173D32"
              strokeWidth="2"
              className="drop-shadow-2xs"
            />
            <text
              x="41"
              y="19"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={isRoomActive('hall') ? '#FFFFFF' : '#173D32'}
            >
              Hall
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
});
