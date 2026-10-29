import { memo } from 'react';
import { StructuralFrame } from './cutaway/StructuralFrame';
import { BedroomZone } from './cutaway/BedroomZone';
import { BathroomZone } from './cutaway/BathroomZone';
import { BalconyZone } from './cutaway/BalconyZone';
import { KitchenZone } from './cutaway/KitchenZone';
import { HallZone } from './cutaway/HallZone';

export const FlatCutawaySvg = memo(function FlatCutawaySvg({
  selectedRoom = null,
  onSelectRoom,
}) {
  const isRoomActive = (id) => selectedRoom === id;

  const handleToggle = (id) => {
    if (onSelectRoom) {
      onSelectRoom(selectedRoom === id ? null : id);
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

          <linearGradient id="hero-ac-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#245544" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#245544" stopOpacity="0" />
          </linearGradient>
        </defs>

        <StructuralFrame />

        <BedroomZone
          isSelected={isRoomActive('bedroom')}
          onSelect={() => handleToggle('bedroom')}
        />

        <BathroomZone
          isSelected={isRoomActive('bathroom')}
          onSelect={() => handleToggle('bathroom')}
        />

        <BalconyZone
          isSelected={isRoomActive('balcony')}
          onSelect={() => handleToggle('balcony')}
        />

        <KitchenZone
          isSelected={isRoomActive('kitchen')}
          onSelect={() => handleToggle('kitchen')}
        />

        <HallZone
          isSelected={isRoomActive('hall')}
          onSelect={() => handleToggle('hall')}
        />
      </svg>
    </div>
  );
});
