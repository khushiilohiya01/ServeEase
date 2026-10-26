import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { SERVICES } from '../../data/servicesData';
import { useCart } from '../../context/CartContext';
import { FlatCutawaySvg } from './FlatCutawaySvg';
import { RoomServicesPanel } from './browseByRoom/RoomServicesPanel';

const ROOM_ZONES = [
  {
    id: 'kitchen',
    label: 'Kitchen',
    tagline: 'Chimney, stove, sink & RO purifier',
    count: 5,
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    tagline: 'Geyser, leaks, fittings & deep wash',
    count: 6,
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    tagline: 'Split AC, fan repair & carpentry',
    count: 6,
  },
  {
    id: 'hall',
    label: 'Hall',
    tagline: 'Fan, sofa cleaning & TV mounting',
    count: 6,
  },
  {
    id: 'balcony',
    label: 'Balcony',
    tagline: 'Pigeon net, mesh & tank cleaning',
    count: 4,
  },
];

export function BrowseByRoom() {
  const [selectedRoom, setSelectedRoom] = useState('kitchen');
  const [addedMap, setAddedMap] = useState({});
  const { addToCart, selectedBhk } = useCart();

  const activeZone = useMemo(() => {
    return ROOM_ZONES.find((z) => z.id === selectedRoom) || ROOM_ZONES[0];
  }, [selectedRoom]);

  const roomServices = useMemo(() => {
    return SERVICES.filter(
      (s) => s.rooms && s.rooms.includes(selectedRoom)
    ).slice(0, 6);
  }, [selectedRoom]);

  const handleAddToCart = (e, service) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(service, { bhk: selectedBhk });
    setAddedMap((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [service.id]: false }));
    }, 2000);
  };

  return (
    <section
      id="browse-by-room"
      className="py-12 lg:py-16 bg-[#F7F8F4] border-b border-[#DDE4DB]"
      aria-labelledby="browse-by-room-heading"
    >
      <div className="container-custom space-y-6 lg:space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Home Explorer</span>
            </div>
            <h2
              id="browse-by-room-heading"
              className="heading-section text-[#191E1B]"
            >
              Find it by room
            </h2>
            <p className="text-sm sm:text-base text-[#647269] max-w-xl leading-relaxed">
              Explore your 2BHK flat zone-by-zone. Tap any room in the cutaway to discover
              essential repairs, installation, and deep cleaning services.
            </p>
          </div>

          <Link
            to={`/services?room=${selectedRoom}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#245544] transition-colors group self-start md:self-end"
          >
            <span>See all {activeZone.label} services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Room Selection Tabs (<768px) */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {ROOM_ZONES.map((room) => {
            const isSelected = selectedRoom === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setSelectedRoom(room.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#173D32] text-white shadow-xs'
                    : 'bg-white border border-[#DDE4DB] text-[#647269] hover:text-[#191E1B]'
                }`}
              >
                {room.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Cutaway Illustration (Left 7 cols) + Side Panel (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Flat Cutaway Component */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DDE4DB] p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#647269] mb-3 pb-2 border-b border-[#DDE4DB]/60">
              <span className="font-semibold text-[#191E1B]">
                Typical Indian 2BHK Layout
              </span>
              <span className="text-[11px] text-[#173D32] font-medium hidden sm:inline">
                Click any zone to inspect
              </span>
            </div>

            <FlatCutawaySvg
              selectedRoom={selectedRoom}
              onSelectRoom={(room) => setSelectedRoom(room || 'kitchen')}
            />

            {/* Hint row below illustration */}
            <div className="flex items-center justify-between text-[11px] text-[#647269] mt-3 pt-2 border-t border-[#DDE4DB]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#173D32]" />
                Selected: <strong className="text-[#191E1B]">{activeZone.label}</strong>
              </span>
              <span>{activeZone.tagline}</span>
            </div>
          </div>

          {/* Right Column: Room Services Side Panel */}
          <RoomServicesPanel
            activeZone={activeZone}
            roomServices={roomServices}
            addedMap={addedMap}
            onAddToCart={handleAddToCart}
            selectedBhk={selectedBhk}
            selectedRoom={selectedRoom}
          />
        </div>
      </div>
    </section>
  );
}
