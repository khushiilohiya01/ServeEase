export function HallZone({ isSelected, onSelect }) {
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
      aria-label="Select Hall zone"
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer focus:outline-none group"
    >
      <rect
        x="382"
        y="280"
        width="482"
        height="242"
        rx="12"
        fill={isSelected ? '#E3EDE2' : '#FFFFFF'}
        stroke={isSelected ? '#173D32' : 'transparent'}
        strokeWidth={isSelected ? '3' : '1'}
        className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
      />

      {/* Ceiling Fan Downrod */}
      <line
        x1="580"
        y1="280"
        x2="580"
        y2="315"
        stroke="#173D32"
        strokeWidth="3.2"
      />

      {/* Rotating Motor & 3 Blades */}
      <g className="hero-fan-blades">
        <circle cx="580" cy="320" r="11" fill="#173D32" />
        <path
          d="M 570,320 Q 518,312 488,321 Q 518,328 570,323 Z"
          fill="#367A55"
          stroke="#173D32"
          strokeWidth="1.2"
        />
        <path
          d="M 590,320 Q 642,312 672,321 Q 642,328 590,323 Z"
          fill="#367A55"
          stroke="#173D32"
          strokeWidth="1.2"
        />
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

      {/* 3-Seater Sofa / Couch */}
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

      {/* Coffee Table */}
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
          fill={isSelected ? '#173D32' : '#FFFFFF'}
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
          fill={isSelected ? '#FFFFFF' : '#173D32'}
        >
          Hall
        </text>
      </g>
    </g>
  );
}
