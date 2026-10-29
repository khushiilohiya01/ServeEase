import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getActiveSeason } from '../../data/seasonsData';
import { SERVICES, formatPricingDisplay } from '../../data/servicesData';

function checkDismissed(seasonId) {
  if (!seasonId || typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(`serveease_dismissed_${seasonId}`) === 'true';
  } catch {
    return false;
  }
}

function SeasonalStripContent({ activeSeason, selectedBhk, mockDate }) {
  const [isDismissed, setIsDismissed] = useState(() => checkDismissed(activeSeason.id));

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(`serveease_dismissed_${activeSeason.id}`, 'true');
    } catch {
      // ignore
    }
  };

  const seasonalServices = useMemo(() => {
    if (!activeSeason || !activeSeason.serviceIds) return [];
    return activeSeason.serviceIds
      .map((id) => SERVICES.find((s) => s.id === id))
      .filter(Boolean);
  }, [activeSeason]);

  if (isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Seasonal Announcement"
      className="bg-[#EAF2E9] border-b border-[#DDE4DB] py-2.5 px-4 text-[#173D32] relative z-20"
    >
      <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-lg bg-[#173D32] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-[#173D32]">
              {activeSeason.title}
            </span>
            {mockDate && (
              <span className="text-[10px] bg-[#173D32]/10 text-[#173D32] px-1.5 py-0.5 rounded font-mono font-semibold">
                mock: {mockDate}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap self-stretch md:self-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 flex-wrap">
            {seasonalServices.map((service) => {
              const priceDisplay = formatPricingDisplay(service.pricing, selectedBhk);
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DB] hover:border-[#173D32] text-[#191E1B] hover:text-[#173D32] text-[11px] font-semibold transition-all duration-150 shadow-2xs hover:shadow-xs group"
                >
                  <span className="truncate max-w-[140px] sm:max-w-none">
                    {service.name}
                  </span>
                  <span className="text-[#173D32] font-bold">
                    ({priceDisplay})
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#647269] group-hover:text-[#173D32] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg text-[#647269] hover:text-[#191E1B] hover:bg-black/5 transition-colors cursor-pointer shrink-0 ml-auto md:ml-0"
            aria-label="Dismiss seasonal announcement"
            title="Dismiss for this session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function SeasonalStrip() {
  const { selectedCity = 'Bengaluru' } = useAuth();
  const { selectedBhk } = useCart();
  const [searchParams] = useSearchParams();
  const mockDate = searchParams.get('mockDate');

  const activeSeason = useMemo(() => {
    return getActiveSeason(selectedCity, mockDate);
  }, [selectedCity, mockDate]);

  if (!activeSeason) {
    return null;
  }

  return (
    <SeasonalStripContent
      key={activeSeason.id}
      activeSeason={activeSeason}
      selectedBhk={selectedBhk}
      mockDate={mockDate}
    />
  );
}
