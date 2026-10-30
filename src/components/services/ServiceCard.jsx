import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Clock, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDuration } from '../../lib/formatters';
import { useCart } from '../../context/CartContext';
import { formatPricingDisplay } from '../../data/servicesData';
import { ServiceSpotIllustration } from '../illustrations/ServiceSpotIllustration';

export function ServiceCard({ service }) {
  const { addToCart, isInCart, selectedBhk, setSelectedBhk } = useCart();
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
  const inCart = isInCart(service);

  return (
    <Card
      hover
      className="flex flex-col h-full bg-white border border-[#DDE4DB] hover:border-[#173D32]/50 p-4 rounded-2xl group shadow-2xs hover:shadow-xl hover:shadow-[#173D32]/8"
    >
      <Link to={`/services/${id}`} className="block mb-3 shrink-0 overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <ServiceSpotIllustration
            serviceId={id}
            category={category}
            aspect="aspect-16/10"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/services/${id}`}>
            <h3 className="text-base font-bold text-[#191E1B] group-hover:text-[#173D32] transition-colors leading-snug">
              {name}
            </h3>
          </Link>

          <p className="text-xs text-[#647269] mt-1.5 leading-relaxed">
            {description}
          </p>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#647269]">
            <Clock className="w-3.5 h-3.5 text-[#647269]" />
            <span>{formatDuration(duration)}</span>
          </div>

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

        <div className="mt-4 pt-3 border-t border-[#DDE4DB]/70 space-y-2.5">
          <div className="text-xs sm:text-sm font-bold text-[#191E1B] leading-snug">
            {priceDisplay}
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/booking/${id}`} className="flex-1">
              <button
                type="button"
                className="btn-shine w-full py-2 text-xs font-bold rounded-xl bg-[#173D32] hover:bg-[#245544] text-white transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md active:scale-95 text-center"
              >
                Book
              </button>
            </Link>
            {inCart ? (
              <Link
                to="/cart"
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#367A55]/40 bg-[#EAF2E9] text-[#173D32] hover:border-[#173D32] transition-colors shadow-2xs inline-flex items-center gap-1"
                aria-label={`${name} is in your cart. View cart`}
              >
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="inline-flex"
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.span>
                Added
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(service, { bhk: selectedBhk })}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#DDE4DB] hover:border-[#173D32] text-[#191E1B] hover:text-[#173D32] hover:bg-[#F2F7F4] bg-white transition-all duration-200 cursor-pointer shadow-2xs active:scale-90 inline-flex items-center gap-1"
                aria-label={`Add ${name} to cart`}
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
