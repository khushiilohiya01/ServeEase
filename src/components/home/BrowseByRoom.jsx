import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Plus,
  Check,
  Clock,
  Compass,
} from 'lucide-react';
import { SERVICES, formatPricingDisplay } from '../../data/servicesData';
import { useCart } from '../../context/CartContext';

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
  const navigate = useNavigate();

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
        {/* Section Heading — Single-tone only */}
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
          {/* Left Column: Flat Cutaway SVG Component */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DDE4DB] p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#647269] mb-3 pb-2 border-b border-[#DDE4DB]/60">
              <span className="font-semibold text-[#191E1B]">
                Typical Indian 2BHK Layout
              </span>
              <span className="text-[11px] text-[#173D32] font-medium hidden sm:inline">
                Click any zone to inspect
              </span>
            </div>

            {/* Inline 2BHK Flat Cutaway SVG */}
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-[#FAFBF8] border border-[#DDE4DB]/70">
              <svg
                viewBox="0 0 880 540"
                className="w-full h-full select-none"
                role="img"
                aria-label="Interactive 2BHK flat cutaway illustration"
              >
                <defs>
                  {/* Pattern for Window Grills */}
                  <pattern
                    id="window-grill"
                    width="12"
                    height="12"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 0,0 L 12,12 M 12,0 L 0,12"
                      fill="none"
                      stroke="#8D9B91"
                      strokeWidth="0.75"
                    />
                  </pattern>

                  {/* Airflow gradient */}
                  <linearGradient id="ac-air" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A9C9AC" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A9C9AC" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 1. STRUCTURAL SLABS & OUTER WALLS */}
                {/* Outer frame */}
                <rect
                  x="15"
                  y="15"
                  width="850"
                  height="510"
                  rx="16"
                  fill="#F4F6F2"
                  stroke="#173D32"
                  strokeWidth="4"
                />

                {/* Horizontal dividing slab between top floor and bottom floor */}
                <rect
                  x="15"
                  y="265"
                  width="850"
                  height="12"
                  fill="#DDE4DB"
                  stroke="#173D32"
                  strokeWidth="2"
                />

                {/* Vertical dividing walls upper floor */}
                <rect
                  x="365"
                  y="15"
                  width="10"
                  height="250"
                  fill="#DDE4DB"
                  stroke="#173D32"
                  strokeWidth="1.5"
                />
                <rect
                  x="615"
                  y="15"
                  width="10"
                  height="250"
                  fill="#DDE4DB"
                  stroke="#173D32"
                  strokeWidth="1.5"
                />

                {/* Vertical dividing wall lower floor (Kitchen vs Hall) */}
                <rect
                  x="365"
                  y="277"
                  width="10"
                  height="248"
                  fill="#DDE4DB"
                  stroke="#173D32"
                  strokeWidth="1.5"
                />

                {/* ========================================================
                    ZONE 1: BEDROOM (Upper Left: x 25 to 365, y 25 to 265)
                ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Select Bedroom zone"
                  aria-pressed={selectedRoom === 'bedroom'}
                  onClick={() => setSelectedRoom('bedroom')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRoom('bedroom');
                    }
                  }}
                  className="cursor-pointer focus:outline-none group motion-reduce:transition-none"
                >
                  {/* Zone backdrop */}
                  <rect
                    x="25"
                    y="25"
                    width="335"
                    height="235"
                    rx="10"
                    fill={selectedRoom === 'bedroom' ? '#EBF3EA' : '#FFFFFF'}
                    stroke={selectedRoom === 'bedroom' ? '#173D32' : 'transparent'}
                    strokeWidth="2.5"
                    className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
                  />

                  {/* Window with Indian Security Grill */}
                  <rect
                    x="45"
                    y="45"
                    width="90"
                    height="75"
                    rx="4"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="48"
                    y="48"
                    width="84"
                    height="69"
                    fill="url(#window-grill)"
                  />

                  {/* Split AC Unit mounted high on wall */}
                  <rect
                    x="180"
                    y="42"
                    width="120"
                    height="32"
                    rx="5"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="185"
                    y1="64"
                    x2="295"
                    y2="64"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <circle cx="288" cy="53" r="2.5" fill="#367A55" />
                  {/* Cool airflow waves */}
                  <path
                    d="M 195,74 Q 210,95 200,115"
                    stroke="#A9C9AC"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 240,74 Q 255,95 245,115"
                    stroke="#A9C9AC"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 285,74 Q 300,95 290,115"
                    stroke="#A9C9AC"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3 3"
                  />

                  {/* Wooden Wardrobe / Almirah */}
                  <rect
                    x="40"
                    y="140"
                    width="60"
                    height="115"
                    rx="4"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="70"
                    y1="140"
                    x2="70"
                    y2="255"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="65"
                    y1="185"
                    x2="65"
                    y2="200"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="75"
                    y1="185"
                    x2="75"
                    y2="200"
                    stroke="#173D32"
                    strokeWidth="2"
                  />

                  {/* Double Bed with Pillows and Blanket */}
                  <rect
                    x="130"
                    y="170"
                    width="190"
                    height="85"
                    rx="6"
                    fill="#DDE4DB"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  {/* Bed Headboard */}
                  <rect
                    x="305"
                    y="145"
                    width="18"
                    height="110"
                    rx="4"
                    fill="#173D32"
                  />
                  {/* Pillows */}
                  <rect
                    x="250"
                    y="178"
                    width="45"
                    height="28"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="250"
                    y="218"
                    width="45"
                    height="28"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  {/* Throw blanket */}
                  <rect
                    x="130"
                    y="170"
                    width="70"
                    height="85"
                    rx="4"
                    fill="#A9C9AC"
                    opacity="0.6"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Room Tag Indicator */}
                  <g transform="translate(42, 35)">
                    <rect
                      width="88"
                      height="22"
                      rx="11"
                      fill={selectedRoom === 'bedroom' ? '#173D32' : '#FFFFFF'}
                      stroke="#173D32"
                      strokeWidth="1.5"
                    />
                    <text
                      x="44"
                      y="15"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={selectedRoom === 'bedroom' ? '#FFFFFF' : '#173D32'}
                    >
                      Bedroom
                    </text>
                  </g>
                </g>

                {/* ========================================================
                    ZONE 2: BATHROOM (Upper Middle: x 380 to 610, y 25 to 265)
                ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Select Bathroom zone"
                  aria-pressed={selectedRoom === 'bathroom'}
                  onClick={() => setSelectedRoom('bathroom')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRoom('bathroom');
                    }
                  }}
                  className="cursor-pointer focus:outline-none group motion-reduce:transition-none"
                >
                  <rect
                    x="380"
                    y="25"
                    width="230"
                    height="235"
                    rx="10"
                    fill={selectedRoom === 'bathroom' ? '#EBF3EA' : '#FFFFFF'}
                    stroke={selectedRoom === 'bathroom' ? '#173D32' : 'transparent'}
                    strokeWidth="2.5"
                    className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
                  />

                  {/* Wall-mounted Cylindrical Geyser with pipes */}
                  <rect
                    x="400"
                    y="45"
                    width="55"
                    height="75"
                    rx="14"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="410"
                    y1="120"
                    x2="410"
                    y2="140"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="445"
                    y1="120"
                    x2="445"
                    y2="140"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <circle cx="427" cy="65" r="3" fill="#367A55" />
                  <circle cx="427" cy="77" r="3" fill="#D97706" />

                  {/* Shower Head */}
                  <path
                    d="M 525,40 L 525,60 L 545,70"
                    fill="none"
                    stroke="#173D32"
                    strokeWidth="2.5"
                  />
                  <polygon points="535,70 555,70 545,65" fill="#173D32" />
                  {/* Droplets */}
                  <circle cx="540" cy="85" r="1.5" fill="#367A55" />
                  <circle cx="550" cy="95" r="1.5" fill="#367A55" />
                  <circle cx="543" cy="108" r="1.5" fill="#367A55" />

                  {/* Bathroom Mirror & Washbasin */}
                  <rect
                    x="475"
                    y="130"
                    width="45"
                    height="50"
                    rx="6"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 470,185 Q 497,205 525,185 Z"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="2"
                  />

                  {/* Classic Indian Bathroom Bucket & Mug (Balti & Magga) */}
                  <path
                    d="M 535,215 L 575,215 L 568,255 L 542,255 Z"
                    fill="#A9C9AC"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <ellipse cx="555" cy="215" rx="20" ry="4" fill="#8D9B91" />
                  {/* Mug resting on edge */}
                  <rect
                    x="565"
                    y="205"
                    width="18"
                    height="18"
                    rx="3"
                    fill="#DDE4DB"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 583,210 Q 590,214 583,219"
                    fill="none"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Room Tag Indicator */}
                  <g transform="translate(395, 35)">
                    <rect
                      width="92"
                      height="22"
                      rx="11"
                      fill={selectedRoom === 'bathroom' ? '#173D32' : '#FFFFFF'}
                      stroke="#173D32"
                      strokeWidth="1.5"
                    />
                    <text
                      x="46"
                      y="15"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={selectedRoom === 'bathroom' ? '#FFFFFF' : '#173D32'}
                    >
                      Bathroom
                    </text>
                  </g>
                </g>

                {/* ========================================================
                    ZONE 3: BALCONY (Upper Right: x 630 to 860, y 25 to 265)
                ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Select Balcony zone"
                  aria-pressed={selectedRoom === 'balcony'}
                  onClick={() => setSelectedRoom('balcony')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRoom('balcony');
                    }
                  }}
                  className="cursor-pointer focus:outline-none group motion-reduce:transition-none"
                >
                  <rect
                    x="630"
                    y="25"
                    width="225"
                    height="235"
                    rx="10"
                    fill={selectedRoom === 'balcony' ? '#EBF3EA' : '#FFFFFF'}
                    stroke={selectedRoom === 'balcony' ? '#173D32' : 'transparent'}
                    strokeWidth="2.5"
                    className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
                  />

                  {/* Open Balcony Grill Railing */}
                  <line
                    x1="640"
                    y1="190"
                    x2="845"
                    y2="190"
                    stroke="#173D32"
                    strokeWidth="3"
                  />
                  <line
                    x1="640"
                    y1="255"
                    x2="845"
                    y2="255"
                    stroke="#173D32"
                    strokeWidth="3"
                  />
                  {[655, 680, 705, 730, 755, 780, 805, 830].map((xPos) => (
                    <line
                      key={xPos}
                      x1={xPos}
                      y1="190"
                      x2={xPos}
                      y2="255"
                      stroke="#173D32"
                      strokeWidth="2"
                    />
                  ))}

                  {/* Clothes Drying Stand (Folding Scissor Rack) */}
                  <line
                    x1="655"
                    y1="110"
                    x2="735"
                    y2="110"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="665"
                    y1="110"
                    x2="715"
                    y2="185"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="715"
                    y1="110"
                    x2="665"
                    y2="185"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  {/* Hanging cloth piece */}
                  <rect
                    x="675"
                    y="112"
                    width="35"
                    height="32"
                    rx="2"
                    fill="#A9C9AC"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Potted Plants (Tulsi / Money Plant) */}
                  <g transform="translate(760, 140)">
                    <path
                      d="M 10,25 L 35,25 L 30,50 L 15,50 Z"
                      fill="#C27854"
                      stroke="#173D32"
                      strokeWidth="2"
                    />
                    <circle cx="15" cy="18" r="9" fill="#367A55" />
                    <circle cx="28" cy="14" r="11" fill="#173D32" />
                    <circle cx="35" cy="22" r="8" fill="#367A55" />
                  </g>

                  {/* Pigeon Net Grid Pattern overlay indicator */}
                  <rect
                    x="640"
                    y="50"
                    width="205"
                    height="130"
                    fill="none"
                    stroke="#A9C9AC"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.7"
                  />

                  {/* Room Tag Indicator */}
                  <g transform="translate(645, 35)">
                    <rect
                      width="88"
                      height="22"
                      rx="11"
                      fill={selectedRoom === 'balcony' ? '#173D32' : '#FFFFFF'}
                      stroke="#173D32"
                      strokeWidth="1.5"
                    />
                    <text
                      x="44"
                      y="15"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={selectedRoom === 'balcony' ? '#FFFFFF' : '#173D32'}
                    >
                      Balcony
                    </text>
                  </g>
                </g>

                {/* ========================================================
                    ZONE 4: MODULAR KITCHEN (Lower Left: x 25 to 365, y 280 to 520)
                ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Select Kitchen zone"
                  aria-pressed={selectedRoom === 'kitchen'}
                  onClick={() => setSelectedRoom('kitchen')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRoom('kitchen');
                    }
                  }}
                  className="cursor-pointer focus:outline-none group motion-reduce:transition-none"
                >
                  <rect
                    x="25"
                    y="280"
                    width="335"
                    height="235"
                    rx="10"
                    fill={selectedRoom === 'kitchen' ? '#EBF3EA' : '#FFFFFF'}
                    stroke={selectedRoom === 'kitchen' ? '#173D32' : 'transparent'}
                    strokeWidth="2.5"
                    className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
                  />

                  {/* Upper Cabinets */}
                  <rect
                    x="40"
                    y="295"
                    width="160"
                    height="50"
                    rx="4"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="93"
                    y1="295"
                    x2="93"
                    y2="345"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="146"
                    y1="295"
                    x2="146"
                    y2="345"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Kitchen Chimney with Exhaust Hood */}
                  <polygon
                    points="225,295 285,295 295,335 215,335"
                    fill="#173D32"
                  />
                  <rect
                    x="240"
                    y="282"
                    width="30"
                    height="15"
                    fill="#173D32"
                  />
                  {/* Mesh filter on underside of chimney */}
                  <line
                    x1="220"
                    y1="337"
                    x2="290"
                    y2="337"
                    stroke="#DDE4DB"
                    strokeWidth="2"
                  />

                  {/* Compact RO Water Purifier on Wall */}
                  <rect
                    x="305"
                    y="310"
                    width="42"
                    height="60"
                    rx="6"
                    fill="#FFFFFF"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <rect
                    x="311"
                    y="335"
                    width="30"
                    height="25"
                    rx="3"
                    fill="#A9C9AC"
                    opacity="0.8"
                  />
                  <circle cx="326" cy="322" r="2.5" fill="#367A55" />

                  {/* Kitchen Countertop (Granite) */}
                  <rect
                    x="40"
                    y="410"
                    width="310"
                    height="18"
                    rx="3"
                    fill="#191E1B"
                  />

                  {/* 3-Burner Gas Stove */}
                  <rect
                    x="215"
                    y="398"
                    width="80"
                    height="14"
                    rx="3"
                    fill="#4A564F"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <ellipse cx="235" cy="404" rx="6" ry="2.5" fill="#DDE4DB" />
                  <ellipse cx="255" cy="404" rx="7" ry="3" fill="#DDE4DB" />
                  <ellipse cx="275" cy="404" rx="6" ry="2.5" fill="#DDE4DB" />

                  {/* Stainless Steel Sink & Faucet */}
                  <rect
                    x="65"
                    y="412"
                    width="60"
                    height="14"
                    rx="3"
                    fill="#DDE4DB"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 95,412 L 95,385 Q 95,375 85,375"
                    fill="none"
                    stroke="#173D32"
                    strokeWidth="2.5"
                  />

                  {/* Lower Modular Drawers */}
                  <rect
                    x="40"
                    y="428"
                    width="310"
                    height="75"
                    rx="4"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <line
                    x1="40"
                    y1="465"
                    x2="350"
                    y2="465"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="140"
                    y1="428"
                    x2="140"
                    y2="503"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="245"
                    y1="428"
                    x2="245"
                    y2="503"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Room Tag Indicator */}
                  <g transform="translate(42, 290)">
                    <rect
                      width="84"
                      height="22"
                      rx="11"
                      fill={selectedRoom === 'kitchen' ? '#173D32' : '#FFFFFF'}
                      stroke="#173D32"
                      strokeWidth="1.5"
                    />
                    <text
                      x="42"
                      y="15"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={selectedRoom === 'kitchen' ? '#FFFFFF' : '#173D32'}
                    >
                      Kitchen
                    </text>
                  </g>
                </g>

                {/* ========================================================
                    ZONE 5: LIVING ROOM / HALL (Lower Right: x 380 to 860, y 280 to 520)
                ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Select Hall zone"
                  aria-pressed={selectedRoom === 'hall'}
                  onClick={() => setSelectedRoom('hall')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRoom('hall');
                    }
                  }}
                  className="cursor-pointer focus:outline-none group motion-reduce:transition-none"
                >
                  <rect
                    x="380"
                    y="280"
                    width="475"
                    height="235"
                    rx="10"
                    fill={selectedRoom === 'hall' ? '#EBF3EA' : '#FFFFFF'}
                    stroke={selectedRoom === 'hall' ? '#173D32' : 'transparent'}
                    strokeWidth="2.5"
                    className="transition-colors duration-200 group-hover:fill-[#F2F7F1]"
                  />

                  {/* Ceiling Fan with Downrod & 3 Aerodynamic Blades */}
                  <line
                    x1="580"
                    y1="280"
                    x2="580"
                    y2="315"
                    stroke="#173D32"
                    strokeWidth="3"
                  />
                  <circle cx="580" cy="320" r="10" fill="#173D32" />
                  {/* Left Blade */}
                  <path
                    d="M 570,320 Q 520,314 490,322 Q 520,328 570,323"
                    fill="#367A55"
                  />
                  {/* Right Blade */}
                  <path
                    d="M 590,320 Q 640,314 670,322 Q 640,328 590,323"
                    fill="#367A55"
                  />
                  {/* Downward Angular Blade */}
                  <path
                    d="M 580,328 Q 575,360 580,378 Q 588,360 584,328"
                    fill="#367A55"
                  />

                  {/* Wall Mounted Flat Screen TV */}
                  <rect
                    x="405"
                    y="330"
                    width="85"
                    height="50"
                    rx="4"
                    fill="#191E1B"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <rect
                    x="410"
                    y="335"
                    width="75"
                    height="40"
                    fill="#3B4841"
                  />

                  {/* 3-Seater Sofa / Couch with Accent Cushions */}
                  <rect
                    x="510"
                    y="420"
                    width="230"
                    height="75"
                    rx="12"
                    fill="#DDE4DB"
                    stroke="#173D32"
                    strokeWidth="2"
                  />
                  <rect
                    x="500"
                    y="425"
                    width="20"
                    height="65"
                    rx="8"
                    fill="#A9C9AC"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="730"
                    y="425"
                    width="20"
                    height="65"
                    rx="8"
                    fill="#A9C9AC"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  {/* Cushions */}
                  <rect
                    x="530"
                    y="430"
                    width="30"
                    height="30"
                    rx="6"
                    fill="#367A55"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="690"
                    y="430"
                    width="30"
                    height="30"
                    rx="6"
                    fill="#367A55"
                    stroke="#173D32"
                    strokeWidth="1.5"
                  />

                  {/* Coffee Table in front of Sofa */}
                  <rect
                    x="570"
                    y="475"
                    width="110"
                    height="24"
                    rx="5"
                    fill="#E8EDE7"
                    stroke="#173D32"
                    strokeWidth="2"
                  />

                  {/* Potted Tall Plant in Corner */}
                  <g transform="translate(790, 420)">
                    <path
                      d="M 12,30 L 38,30 L 32,70 L 18,70 Z"
                      fill="#C27854"
                      stroke="#173D32"
                      strokeWidth="2"
                    />
                    <ellipse cx="25" cy="18" rx="14" ry="24" fill="#367A55" />
                    <ellipse cx="12" cy="12" rx="12" ry="18" fill="#173D32" />
                    <ellipse cx="38" cy="12" rx="12" ry="18" fill="#367A55" />
                  </g>

                  {/* Room Tag Indicator */}
                  <g transform="translate(395, 290)">
                    <rect
                      width="76"
                      height="22"
                      rx="11"
                      fill={selectedRoom === 'hall' ? '#173D32' : '#FFFFFF'}
                      stroke="#173D32"
                      strokeWidth="1.5"
                    />
                    <text
                      x="38"
                      y="15"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill={selectedRoom === 'hall' ? '#FFFFFF' : '#173D32'}
                    >
                      Hall
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Hint row below illustration */}
            <div className="flex items-center justify-between text-[11px] text-[#647269] mt-3 pt-2 border-t border-[#DDE4DB]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#173D32]" />
                Selected: <strong className="text-[#191E1B]">{activeZone.label}</strong>
              </span>
              <span>{activeZone.tagline}</span>
            </div>
          </div>

          {/* Right Column: Room Services Side Panel (Zero Layout Shift) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#DDE4DB] p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DB]">
                <div>
                  <h3 className="text-base font-bold text-[#191E1B]">
                    {activeZone.label} Essentials
                  </h3>
                  <p className="text-xs text-[#647269] mt-0.5">
                    {roomServices.length} popular doorstep services
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8EDE7] text-[#173D32]">
                  {activeZone.label}
                </span>
              </div>

              {/* Service Cards Stack (4-6 services) */}
              <div className="divide-y divide-[#DDE4DB]/60 mt-1">
                {roomServices.map((service) => {
                  const isAdded = addedMap[service.id];
                  const priceDisplay = formatPricingDisplay(service.pricing, selectedBhk);

                  return (
                    <div
                      key={service.id}
                      className="py-3 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <Link
                          to={`/services/${service.id}`}
                          className="text-xs sm:text-sm font-bold text-[#191E1B] hover:text-[#173D32] transition-colors line-clamp-1"
                        >
                          {service.name}
                        </Link>
                        <p className="text-[11px] text-[#647269] truncate mt-0.5">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                          <span className="font-bold text-[#173D32]">
                            {priceDisplay}
                          </span>
                          <span className="text-[#647269]">•</span>
                          <span className="flex items-center gap-1 text-[#647269]">
                            <Clock className="w-3 h-3 text-[#647269]" />
                            {service.durationMins}m
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, service)}
                          aria-label={`Add ${service.name} to cart`}
                          className={`p-2 rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs ${
                            isAdded
                              ? 'bg-[#367A55] text-white border-[#367A55]'
                              : 'bg-[#F7F8F4] border-[#DDE4DB] text-[#191E1B] hover:border-[#173D32] hover:text-[#173D32]'
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/booking/${service.id}`)}
                          className="px-3 py-2 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom link to catalog with room filter */}
            <div className="pt-4 mt-2 border-t border-[#DDE4DB]">
              <Link
                to={`/services?room=${selectedRoom}`}
                className="w-full py-2.5 rounded-xl bg-[#E8EDE7] hover:bg-[#DDE4DB] text-[#173D32] text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>See all {activeZone.label} services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
