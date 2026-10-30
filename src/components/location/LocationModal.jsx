import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  MapPin,
  Search,
  Check,
  Navigation,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  CITIES_CONFIG,
  findLocalityByPincode,
  searchLocalities,
} from '../../data/locationsData';
import { describeDetectedArea, describeGeoError, detectServiceArea } from '../../lib/geolocation';
import toast from 'react-hot-toast';

export function LocationModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <LocationModalContent onClose={onClose} />,
    document.body
  );
}

function LocationModalContent({ onClose }) {
  const {
    selectedCity = 'Bengaluru',
    selectedLocality = 'Koramangala',
    setSelectedLocation,
  } = useAuth();

  const [activeCityTab, setActiveCityTab] = useState(selectedCity);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [pincodeError, setPincodeError] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const trimmedQuery = searchQuery.trim();
  const isPincodeQuery = /^\d+$/.test(trimmedQuery);
  const isExact6DigitPin = /^\d{6}$/.test(trimmedQuery);
  const matchedPincodeLocality = isExact6DigitPin
    ? findLocalityByPincode(trimmedQuery)
    : null;
  const isUnknownPincode = isExact6DigitPin && !matchedPincodeLocality;

  const searchResults = !isUnknownPincode && trimmedQuery ? searchLocalities(trimmedQuery) : [];

  const currentCityObj =
    CITIES_CONFIG.find(
      (c) => c.name.toLowerCase() === activeCityTab.toLowerCase()
    ) || CITIES_CONFIG[0];

  const handleSelectLocality = (city, locality, message) => {
    setSelectedLocation({
      city: city.name,
      locality: locality.name,
      pincode: locality.pincode,
    });
    toast.success(message || `Service area set to ${locality.name}, ${city.name}`, {
      duration: message ? 6000 : 4000,
    });
    onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPincodeError(null);

    if (isPincodeQuery) {
      if (!isExact6DigitPin) {
        setPincodeError('Please enter a valid 6-digit Indian pincode');
        return;
      }
      if (matchedPincodeLocality) {
        handleSelectLocality(
          matchedPincodeLocality.city,
          matchedPincodeLocality.locality
        );
      }
    } else if (searchResults.length > 0) {
      handleSelectLocality(searchResults[0].city, searchResults[0].locality);
    }
  };

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    setGeoError(null);

    try {
      const result = await detectServiceArea();
      if (result.covered) {
        handleSelectLocality(result.city, result.locality, describeDetectedArea(result));
        return;
      }
      const where = result.place?.area && result.place?.city
        ? `${result.place.area}, ${result.place.city}`
        : result.place?.city;
      setGeoError(
        where
          ? `Looks like you're in ${where}. We don't serve there yet, so pick the nearest area below.`
          : "You seem to be outside our service areas. Pick the nearest area below."
      );
    } catch (err) {
      setGeoError(describeGeoError(err));
    } finally {
      setIsDetecting(false);
    }
  };

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsNotified(true);
    toast.success(`We will notify you at ${notifyEmail}!`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-dialog-title"
    >
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#DDE4DB] p-5 sm:p-7 z-10 my-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-4 space-y-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-2 border-b border-[#DDE4DB]/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173D32]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#647269]">
              Select Locality & Pincode
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-full text-[#647269] hover:text-[#191E1B] hover:bg-[#F7F8F4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2
            id="location-dialog-title"
            className="text-xl sm:text-2xl font-bold text-[#191E1B] tracking-tight"
          >
            Where do you need service?
          </h2>
          <p className="text-xs sm:text-sm text-[#647269] mt-1">
            Choose your neighbourhood for verified technician dispatch and real-time arrival slots.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full p-3 rounded-2xl bg-[#E8EDE7] hover:bg-[#DDE4DB] border border-[#173D32]/20 text-[#173D32] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>
              {isDetecting ? 'Finding your location...' : 'Use my current location'}
            </span>
          </button>

          {geoError && (
            <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>{geoError}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647269]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPincodeError(null);
              }}
              placeholder="Search locality, society or 6-digit pincode (e.g. 560034)..."
              className="w-full rounded-2xl border border-[#DDE4DB] bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#191E1B] placeholder:text-[#647269]/70 focus:outline-none focus:border-[#173D32] focus:ring-2 focus:ring-[#173D32]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setPincodeError(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#647269] hover:text-[#191E1B] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {pincodeError && (
            <p className="text-xs text-rose-600 font-semibold px-1 pt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{pincodeError}</span>
            </p>
          )}
        </form>

        <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[200px]">
          {isUnknownPincode ? (
            <div className="p-5 rounded-2xl bg-[#F7F8F4] border border-[#DDE4DB] text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#191E1B]">
                  Area not covered yet
                </h3>
                <p className="text-xs text-[#647269] max-w-sm mx-auto leading-relaxed">
                  We don&apos;t serve pincode <strong className="text-[#191E1B]">{trimmedQuery}</strong> yet. We are actively onboarded in major metros and expanding rapidly.
                </p>
              </div>

              {!isNotified ? (
                <form
                  onSubmit={handleNotifySubmit}
                  className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-1"
                >
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter email to get notified"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDE4DB] bg-white focus:outline-none focus:border-[#173D32]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold rounded-xl cursor-pointer shadow-2xs transition-colors shrink-0"
                  >
                    Notify me
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Thank you! We&apos;ll notify you at {notifyEmail} when we launch in {trimmedQuery}.
                  </span>
                </div>
              )}
            </div>
          ) : trimmedQuery ? (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#647269] uppercase tracking-wider block px-1">
                Search Results ({searchResults.length})
              </span>
              {searchResults.length > 0 ? (
                searchResults.map(({ city, locality }) => {
                  const isCurrent =
                    selectedCity.toLowerCase() === city.name.toLowerCase() &&
                    selectedLocality.toLowerCase() === locality.name.toLowerCase();

                  return (
                    <button
                      key={`${city.id}-${locality.name}`}
                      type="button"
                      onClick={() => handleSelectLocality(city, locality)}
                      className={`w-full p-3 rounded-2xl text-left flex items-center justify-between border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#E8EDE7] text-[#173D32] border-[#173D32] font-semibold'
                          : 'bg-white hover:bg-[#F7F8F4] border-[#DDE4DB] text-[#191E1B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#173D32] shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold">
                            {locality.name}
                          </p>
                          <p className="text-[11px] text-[#647269]">
                            {city.name} • PIN {locality.pincode}
                          </p>
                        </div>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-[#173D32]" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-[#647269]">
                  No localities matched &quot;{trimmedQuery}&quot;. Try selecting your city below.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#DDE4DB]/70">
                {CITIES_CONFIG.map((c) => {
                  const isActive = activeCityTab.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCityTab(c.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#173D32] text-white shadow-2xs'
                          : 'bg-[#F7F8F4] text-[#647269] hover:text-[#191E1B] border border-[#DDE4DB]/60'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#647269] block px-1">
                  Active Neighbourhoods in {currentCityObj.name}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {currentCityObj.localities.map((loc) => {
                    const isSelected =
                      selectedCity.toLowerCase() === currentCityObj.name.toLowerCase() &&
                      selectedLocality.toLowerCase() === loc.name.toLowerCase();

                    return (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => handleSelectLocality(currentCityObj, loc)}
                        className={`p-2.5 rounded-xl text-left flex items-center justify-between border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E8EDE7] text-[#173D32] font-bold border-[#173D32]'
                            : 'bg-white hover:bg-[#F7F8F4] border-[#DDE4DB] text-[#191E1B]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-1">
                          <MapPin className="w-3.5 h-3.5 text-[#173D32] shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-semibold text-[#191E1B] truncate">
                              {loc.name}
                            </p>
                            <p className="text-[10px] text-[#647269]">PIN {loc.pincode}</p>
                          </div>
                        </div>

                        {isSelected && <Check className="w-3.5 h-3.5 text-[#173D32] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[#DDE4DB]/70 flex items-center justify-between text-[11px] text-[#647269]">
          <span>All pros vetted and dispatched from local neighbourhood hubs.</span>
          <span className="font-semibold text-[#173D32]">30-Day Guarantee</span>
        </div>
      </div>
    </div>
  );
}
