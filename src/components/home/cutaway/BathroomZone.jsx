export function BathroomZone({ isSelected, onSelect }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label="Select Bathroom zone"
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer focus:outline-none group"
    >
      <rect
        x="382"
        y="20"
        width="232"
        height="242"
        rx="12"
        fill={isSelected ? '#E3EDE2' : '#FFFFFF'}
        stroke={isSelected ? '#173D32' : 'transparent'}
        strokeWidth={isSelected ? '3' : '1'}
        className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
      />

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

      <rect
        x="604"
        y="48"
        width="6"
        height="18"
        rx="2"
        fill="#173D32"
      />
      <path
        d="M 604,57 L 548,57 Q 532,57 532,74 L 532,84"
        fill="none"
        stroke="#173D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
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
      <circle cx="526" cy="104" r="1.8" fill="#367A55" />
      <circle cx="532" cy="112" r="1.8" fill="#367A55" />
      <circle cx="538" cy="105" r="1.8" fill="#367A55" />

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
      <path
        d="M 489,182 L 489,165 Q 489,156 480,156"
        fill="none"
        stroke="#173D32"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="480"
        cy="166"
        r="2"
        fill="#367A55"
        className="hero-tap-drop"
      />

      <path
        d="M 536,214 L 582,214 L 574,254 L 544,254 Z"
        fill="#A9C9AC"
        stroke="#173D32"
        strokeWidth="2.2"
      />
      <ellipse cx="559" cy="214" rx="23" ry="5" fill="#8D9B91" />
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

      <g transform="translate(395, 32)">
        <rect
          width="106"
          height="28"
          rx="14"
          fill={isSelected ? '#173D32' : '#FFFFFF'}
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
          fill={isSelected ? '#FFFFFF' : '#173D32'}
        >
          Bathroom
        </text>
      </g>
    </g>
  );
}
