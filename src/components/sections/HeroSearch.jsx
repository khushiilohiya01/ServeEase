import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { SEARCH_PLACEHOLDERS } from '../../data/siteContent';
import { useAuth } from '../../context/AuthContext';
import { LocationModal } from '../location/LocationModal';

export function HeroSearch() {
  const navigate = useNavigate();
  const { selectedCity } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
        setIsAnimating(false);
      }, 250);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/services?q=${encodeURIComponent(query)}&city=${encodeURIComponent(selectedCity)}`);
    } else {
      navigate(`/services?city=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto"
        role="search"
        aria-label="Find home service"
      >
        <div className="bg-white rounded-full p-2 pl-4 sm:pl-5 pr-2 border border-neutral-200/90 shadow-md shadow-neutral-900/5 hover:shadow-lg hover:border-neutral-300 transition-all duration-200 flex items-center justify-between gap-2 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" aria-hidden="true" />

          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=""
              aria-label="What needs fixing?"
              className="w-full bg-transparent text-neutral-900 text-xs sm:text-sm placeholder:text-neutral-400 focus:outline-hidden py-2"
            />
            {!searchQuery && (
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center pointer-events-none text-xs sm:text-sm text-neutral-400 truncate transition-all duration-250 ${
                  isAnimating ? '-translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                {SEARCH_PLACEHOLDERS[placeholderIndex]}
              </span>
            )}
          </div>

          <div className="w-px h-6 bg-neutral-200 mx-1 sm:mx-2 shrink-0" aria-hidden="true" />

          {/* Location Chip Button */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            aria-label={`Current location: ${selectedCity}. Click to change city.`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors text-xs sm:text-sm font-medium text-neutral-800 shrink-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
            <span className="font-semibold text-neutral-900 max-w-[90px] sm:max-w-none truncate">
              {selectedCity}
            </span>
          </button>

          {/* Filled Green Round Action Button */}
          <button
            type="submit"
            aria-label="Search verified home services"
            className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 active:scale-95 text-white flex items-center justify-center shrink-0 transition-all shadow-xs cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-700/50"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
