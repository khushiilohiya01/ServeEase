export function KitchenZone({ isSelected, onSelect }) {
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
      aria-label="Select Kitchen zone"
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer focus:outline-none group"
    >
      <rect
        x="20"
        y="280"
        width="345"
        height="242"
        rx="12"
        fill={isSelected ? '#E3EDE2' : '#FFFFFF'}
        stroke={isSelected ? '#173D32' : 'transparent'}
        strokeWidth={isSelected ? '3' : '1'}
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
          fill={isSelected ? '#173D32' : '#FFFFFF'}
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
          fill={isSelected ? '#FFFFFF' : '#173D32'}
        >
          Kitchen
        </text>
      </g>
    </g>
  );
}
