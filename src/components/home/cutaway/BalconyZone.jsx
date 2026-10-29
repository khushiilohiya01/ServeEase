export function BalconyZone({ isSelected, onSelect }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const railingX = [656, 684, 712, 740, 768, 796, 824, 848];

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label="Select Balcony zone"
      aria-pressed={isSelected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className="cursor-pointer focus:outline-none group"
    >
      <rect
        x="632"
        y="20"
        width="232"
        height="242"
        rx="12"
        fill={isSelected ? '#E3EDE2' : '#FFFFFF'}
        stroke={isSelected ? '#173D32' : 'transparent'}
        strokeWidth={isSelected ? '3' : '1'}
        className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
      />

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
      {railingX.map((xPos) => (
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

      <g transform="translate(645, 32)">
        <rect
          width="100"
          height="28"
          rx="14"
          fill={isSelected ? '#173D32' : '#FFFFFF'}
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
          fill={isSelected ? '#FFFFFF' : '#173D32'}
        >
          Balcony
        </text>
      </g>
    </g>
  );
}
