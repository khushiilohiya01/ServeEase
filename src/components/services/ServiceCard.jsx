import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDuration } from '../../lib/formatters';
import { useCart } from '../../context/CartContext';
import { formatPricingDisplay } from '../../data/servicesData';
import { ServiceSpotIllustration } from '../illustrations/ServiceSpotIllustration';

export function ServiceCard({ service }) {
  const { addToCart, selectedBhk, setSelectedBhk } = useCart();
  const {
    id,
    name,
    category,
    description,
    durationMins,
    duration_minutes,
    pricing,
  } = service;

  const duration = durationMins || duration_minutes || 45;
  const priceDisplay = formatPricingDisplay(pricing, selectedBhk);

  return (
    <Card
      hover
      className="flex flex-col h-full bg-white border border-[#DDE4DB] hover:border-[#173D32]/50 transition-all duration-200 p-4 rounded-2xl group shadow-2xs hover:shadow-xs"
    >
      {/* 1. Architectural Spot Illustration with Hover Micro-motion */}
      <Link to={`/services/${id}`} className="block mb-3 shrink-0">
        <ServiceSpotIllustration
          serviceId={id}
          category={category}
          aspect="aspect-16/10"
        />
      </Link>

      {/* 2. Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Service Name */}
          <Link to={`/services/${id}`}>
            <h3 className="text-base font-bold text-[#191E1B] group-hover:text-[#173D32] transition-colors leading-snug">
              {name}
            </h3>
          </Link>

          {/* One-line Plain Description (no ellipsis truncation) */}
          <p className="text-xs text-[#647269] mt-1.5 leading-relaxed">
            {description}
          </p>

          {/* Duration */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#647269]">
            <Clock className="w-3.5 h-3.5 text-[#647269]" />
            <span>{formatDuration(duration)}</span>
          </div>

          {/* Segmented BHK switch for per_bhk services */}
          {pricing?.kind === 'per_bhk' && (
            <div className="mt-3 flex items-center gap-1 p-1 bg-[#F7F8F4] border border-[#DDE4DB] rounded-lg">
              {['1BHK', '2BHK', '3BHK'].map((bhk) => {
                const isSelected = (selectedBhk || '2BHK') === bhk;
                return (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => setSelectedBhk(bhk)}
                    className={`flex-1 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#173D32] text-white shadow-2xs'
                        : 'text-[#647269] hover:text-[#191E1B]'
                    }`}
                  >
                    {bhk}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Pricing and Actions */}
        <div className="mt-4 pt-3 border-t border-[#DDE4DB]/70 space-y-2.5">
          <div className="text-xs sm:text-sm font-bold text-[#191E1B] leading-snug">
            {priceDisplay}
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/booking/${id}`} className="flex-1">
              <button
                type="button"
                className="w-full py-2 text-xs font-bold rounded-xl bg-[#173D32] hover:bg-[#245544] text-white transition-colors cursor-pointer shadow-2xs text-center"
              >
                Book
              </button>
            </Link>
            <button
              type="button"
              onClick={() => addToCart(service, { bhk: selectedBhk })}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#DDE4DB] hover:border-[#173D32] text-[#191E1B] hover:text-[#173D32] bg-white transition-colors cursor-pointer shadow-2xs"
              aria-label={`Add ${name} to cart`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
