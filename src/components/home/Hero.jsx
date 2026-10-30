import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  X,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { SERVICES, formatPricingDisplay, getRoomSymptomChips } from '../../data/servicesData';
import { getLocalityProof } from '../../data/locationsData';
import { HERO_PLACEHOLDERS, getHeroSymptomChips } from '../../data/heroData';
import { FlatCutawaySvg } from './FlatCutawaySvg';
import { ServiceSpotIllustration } from '../illustrations/ServiceSpotIllustration';

const ROOM_NAMES = {
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
  bedroom: 'Bedroom',
  hall: 'Hall',
  balcony: 'Balcony',
};

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { selectedCity = 'Bengaluru', selectedLocality = 'Koramangala' } = useAuth();
  const { selectedBhk } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mockDate = searchParams.get('mockDate');
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % HERO_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isFocused]);

  const defaultChips = useMemo(() => {
    return getHeroSymptomChips(selectedCity, mockDate);
  }, [selectedCity, mockDate]);

  const activeChips = useMemo(() => {
    if (!selectedRoom) return defaultChips;
    const roomSymptoms = getRoomSymptomChips(selectedRoom);
    return [
      { label: 'All issues', isReset: true },
      ...roomSymptoms,
    ];
  }, [selectedRoom, defaultChips]);

  const matchingServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      if (selectedRoom) {
        return SERVICES.filter((s) => s.rooms && s.rooms.includes(selectedRoom)).slice(0, 5);
      }
      return SERVICES.slice(0, 4);
    }

    const tokens = q.split(/\s+/).filter(Boolean);
    return SERVICES.filter((service) => {
      const haystack = [
        service.name,
        service.category,
        service.description,
        ...(service.symptoms || []),
        ...(service.rooms || []),
      ]
        .join(' ')
        .toLowerCase();

      return tokens.every((token) => haystack.includes(token));
    }).slice(0, 5);
  }, [searchQuery, selectedRoom]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < matchingServices.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : matchingServices.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && matchingServices[selectedIndex]) {
        navigate(`/services/${matchingServices[selectedIndex].id}`);
      } else if (searchQuery.trim()) {
        navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate('/services');
      }
      setIsFocused(false);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && matchingServices[selectedIndex]) {
      navigate(`/services/${matchingServices[selectedIndex].id}`);
    } else if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
    setIsFocused(false);
  };

  const handleChipClick = (chip) => {
    if (chip.isReset) {
      setSelectedRoom(null);
      return;
    }
    setSearchQuery(chip.query || chip.label);
    setIsFocused(true);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const proofText = getLocalityProof(selectedLocality);

  return (
    <section className="relative bg-[#F7F8F4] border-b border-[#DDE4DB] py-6 sm:py-8 lg:py-10 overflow-visible">
      <div aria-live="polite" className="sr-only">
        {selectedRoom
          ? `Showing common issues for ${ROOM_NAMES[selectedRoom] || selectedRoom}`
          : 'Showing all common issues'}
      </div>

      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-[#A9C9AC]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-left animate-in fade-in slide-in-from-bottom-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDE4DB] text-[#173D32] text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#173D32] animate-pulse" />
                <span>
                  Verified pros in {selectedLocality}, {selectedCity}
                </span>
              </div>
            </div>

            <h1 className="heading-hero text-[#191E1B]">
              What&apos;s not working{' '}
              <span className="text-[#173D32]">at home?</span>
            </h1>

            <p className="text-sm sm:text-base text-[#647269] max-w-xl leading-relaxed font-normal">
              Book a trusted technician in minutes. Pay only after the job is done.
            </p>

            <div className="pt-0.5 max-w-xl relative" ref={searchContainerRef}>
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center bg-white rounded-2xl border transition-all duration-200 shadow-xs ${
                  isFocused
                    ? 'border-[#173D32] ring-3 ring-[#173D32]/10 shadow-md'
                    : 'border-[#DDE4DB] hover:border-[#173D32]/40'
                }`}
              >
                <div className="pl-4 pr-2 text-[#647269]">
                  <Search className="w-5 h-5 text-[#173D32]" />
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded={isFocused}
                  aria-controls="hero-search-listbox"
                  aria-autocomplete="list"
                  aria-activedescendant={
                    selectedIndex >= 0 ? `hero-search-item-${selectedIndex}` : undefined
                  }
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(-1);
                    if (!isFocused) setIsFocused(true);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Try "${HERO_PLACEHOLDERS[placeholderIndex]}"`}
                  className="w-full py-3 sm:py-3.5 text-sm sm:text-base text-[#191E1B] placeholder-[#647269]/70 bg-transparent outline-none font-medium"
                  aria-label="Search for symptoms or services"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndex(-1);
                      inputRef.current?.focus();
                    }}
                    className="p-2 text-[#647269] hover:text-[#191E1B] transition-colors cursor-pointer mr-1"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="submit"
                  className="mr-2 px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {isFocused && (
                <div
                  id="hero-search-listbox"
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#DDE4DB] shadow-xl overflow-hidden z-40 divide-y divide-[#DDE4DB]/60 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="p-2 bg-[#F7F8F4] text-[11px] font-semibold text-[#647269] flex items-center justify-between">
                    <span>
                      {searchQuery.trim()
                        ? `Services matching "${searchQuery.trim()}"`
                        : selectedRoom
                          ? `Popular ${ROOM_NAMES[selectedRoom]} services`
                          : 'Suggested services'}
                    </span>
                    <span className="text-[10px] text-[#8D9B91]">
                      Use ↑↓ arrows to navigate
                    </span>
                  </div>

                  {matchingServices.length > 0 ? (
                    matchingServices.map((service, idx) => {
                      const isSelected = selectedIndex === idx;
                      const priceStr = formatPricingDisplay(service.pricing, selectedBhk);

                      return (
                        <div
                          key={service.id}
                          id={`hero-search-item-${idx}`}
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          onClick={() => {
                            navigate(`/services/${service.id}`);
                            setIsFocused(false);
                          }}
                          className={`p-2.5 sm:p-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#E8EDE7] text-[#173D32]'
                              : 'hover:bg-[#F7F8F4] text-[#191E1B]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <ServiceSpotIllustration
                              serviceId={service.id}
                              category={service.category}
                              aspect="aspect-square"
                              className="w-10 h-10 shrink-0 p-1 rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold truncate">
                                  {service.name}
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#DDE4DB] text-[#173D32]">
                                  {service.category}
                                </span>
                              </div>
                              <p className="text-xs text-[#647269] mt-0.5 truncate">
                                {service.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-[#173D32]">
                              {priceStr}
                            </span>
                            <div className="flex items-center justify-end gap-1 text-[10px] text-[#647269] mt-0.5">
                              <Clock className="w-3 h-3" />
                              <span>{service.durationMins}m</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center text-xs text-[#647269]">
                      <p className="font-semibold text-[#191E1B]">No services found</p>
                      <p className="mt-1">
                        Try searching for &quot;ac&quot;, &quot;tap&quot;, &quot;pest&quot;, or &quot;cleaning&quot;
                      </p>
                    </div>
                  )}

                  <div className="p-2.5 bg-[#F7F8F4] text-center text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(
                          searchQuery.trim()
                            ? `/services?q=${encodeURIComponent(searchQuery.trim())}`
                            : '/services'
                        );
                        setIsFocused(false);
                      }}
                      className="font-bold text-[#173D32] hover:underline cursor-pointer"
                    >
                      View all 50+ services →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5 pt-0.5">
              <div className="min-h-[38px] flex items-center">
                <div
                  key={selectedRoom || 'all'}
                  className="flex flex-wrap items-center gap-1.5 text-xs animate-in fade-in duration-200 motion-reduce:animate-none"
                >
                  <span className="font-semibold text-[#191E1B] mr-0.5 shrink-0">
                    {selectedRoom ? `${ROOM_NAMES[selectedRoom]} issues:` : 'Common issues:'}
                  </span>
                  {activeChips.map((chip) => {
                    const isReset = chip.isReset;
                    const isSeasonal = chip.isSeasonal;

                    return (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className={`px-3 py-1.5 rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs ${
                          isReset
                            ? 'bg-[#173D32] border-[#173D32] text-white font-semibold hover:bg-[#245544]'
                            : isSeasonal
                              ? 'bg-[#E8EDE7] border-[#173D32]/40 text-[#173D32] font-semibold hover:bg-[#DDE4DB]'
                              : 'bg-white border-[#DDE4DB] text-[#191E1B] hover:border-[#173D32] hover:text-[#173D32]'
                        }`}
                      >
                        {isReset && <RotateCcw className="w-3 h-3 inline mr-1 -mt-0.5" />}
                        {isSeasonal && <span className="mr-1">✨</span>}
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedRoom && (
                <div className="animate-in fade-in duration-150 motion-reduce:animate-none">
                  <Link
                    to={`/services?room=${selectedRoom}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173D32] hover:text-[#245544] transition-colors group"
                  >
                    <span>See all {ROOM_NAMES[selectedRoom] || selectedRoom} services</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            <div className="block lg:hidden pt-3 pb-1 max-w-sm sm:max-w-md mx-auto">
              <FlatCutawaySvg
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
              />
              <p className="text-[11px] text-center text-[#647269] mt-1.5 font-medium">
                Tap a room to see common issues
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById('services-discovery');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/services');
                  }
                }}
                className="px-5 py-2.5 sm:py-3 rounded-2xl bg-[#173D32] hover:bg-[#245544] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/services');
                  }
                }}
                className="px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-[#DDE4DB] hover:border-[#173D32]/60 text-[#191E1B] text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              >
                How It Works
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#173D32]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>{proofText}</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative hidden lg:block animate-in fade-in zoom-in-95 [animation-delay:150ms] [animation-duration:0.7s]">
            <div className="w-full max-w-xl mx-auto">
              <FlatCutawaySvg
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
              />
              <p className="text-xs text-center text-[#647269] mt-2 font-medium">
                Tap a room to see common issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
