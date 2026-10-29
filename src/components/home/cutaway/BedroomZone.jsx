export function BedroomZone({ isSelected, onSelect }) {
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
      aria-label="Select Bedroom zone"
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer focus:outline-none group"
    >
      <rect
        x="20"
        y="20"
        width="345"
        height="242"
        rx="12"
        fill={isSelected ? '#E3EDE2' : '#FFFFFF'}
        stroke={isSelected ? '#173D32' : 'transparent'}
        strokeWidth={isSelected ? '3' : '1'}
        className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
      />

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

      <g transform="translate(36, 32)">
        <rect
          width="104"
          height="28"
          rx="14"
          fill={isSelected ? '#173D32' : '#FFFFFF'}
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
          fill={isSelected ? '#FFFFFF' : '#173D32'}
        >
          Bedroom
        </text>
      </g>
    </g>
  );
}
