import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Clock,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { INITIAL_SERVICES } from '../../lib/mockData';
import { formatCurrency } from '../../lib/formatters';

const FEATURED_SERVICE_IDS = [1, 19, 3, 10, 6, 13];

const TABS = [
  { id: 'all', label: 'All Curated' },
  { id: 'home_cleaning', label: 'Cleaning' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'ac_appliances', label: 'AC & Climate' },
  { id: 'carpentry', label: 'Carpentry' },
];

export function FeaturedServices() {
  const [activeTab, setActiveTab] = useState('all');
  const [addedMap, setAddedMap] = useState({});
  const { addToCart, items } = useCart();
  const navigate = useNavigate();

  // Curate 6 top balanced services from INITIAL_SERVICES
  const featuredServices = FEATURED_SERVICE_IDS.map((id) =>
    INITIAL_SERVICES.find((s) => s.id === id)
  ).filter(Boolean);

  const filteredServices =
    activeTab === 'all'
      ? featuredServices
      : featuredServices.filter((s) => s.category === activeTab);

  const handleAddToCart = (e, service) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(service);
    setAddedMap((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [service.id]: false }));
    }, 2200);
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#DDE4DB]" aria-labelledby="featured-heading">
      <div className="container-custom space-y-10">
        {/* Header and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Flat-Rate Packages</span>
            </div>
            <h2
              id="featured-heading"
              className="heading-section text-[#191E1B]"
            >
              Curated home services,{' '}
              <span className="text-[#173D32]">
                effortlessly booked.
              </span>
            </h2>
            <p className="text-base text-[#647269] max-w-xl leading-relaxed">
              Transparent fixed rates booked frequently by homeowners. Equipment provided,
              technicians background-verified, and backed by our 30-day rework warranty.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#173D32] text-white shadow-sm'
                    : 'bg-[#F7F8F4] text-[#647269] hover:text-[#191E1B] hover:bg-[#E8EDE7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isAdded = addedMap[service.id];
              const isInCart = items.some((i) => i.serviceId === service.id);

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-[#F7F8F4] rounded-3xl border border-[#DDE4DB] overflow-hidden flex flex-col justify-between hover:border-[#173D32]/40 hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative aspect-16/10 overflow-hidden bg-neutral-200">
                      <img
                        src={service.image_url}
                        alt={service.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        {service.popular && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#173D32] backdrop-blur-md shadow-xs">
                            Top Rated
                          </span>
                        )}
                      </div>

                      {/* Rating pill */}
                      <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{service.rating}</span>
                        <span className="text-white/60 text-[10px]">({service.reviews_count})</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#66716A] uppercase tracking-wider">
                          <span>{service.category.replace('_', ' ')}</span>
                          <span className="flex items-center gap-1 font-semibold normal-case text-[#191E1B]">
                            <Clock className="w-3.5 h-3.5 text-[#173D32]" />
                            {service.duration_minutes} mins
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#191E1B] group-hover:text-[#173D32] transition-colors leading-snug line-clamp-1">
                          <Link to={`/services/${service.id}`} className="hover:underline">
                            {service.name}
                          </Link>
                        </h3>

                        <p className="text-xs text-[#66716A] leading-relaxed line-clamp-2 h-9">
                          {service.description}
                        </p>
                      </div>

                      {/* Key Inclusions preview */}
                      {service.inclusions && service.inclusions.length > 0 && (
                        <div className="pt-2.5 border-t border-[#DDE3DA]/80 space-y-1.5 min-h-[52px]">
                          {service.inclusions.slice(0, 2).map((inc, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-[#191E1B]">
                              <Check className="w-3.5 h-3.5 text-[#367A55] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{inc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer & Actions */}
                  <div className="p-6 pt-0 border-t border-[#DDE3DA]/60 mt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#66716A] block font-medium uppercase tracking-wider">Fixed Rate</span>
                      <span className="text-lg font-bold text-[#173D32] tracking-tight">
                        {formatCurrency(service.base_price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Add to Cart with state animation */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, service)}
                        className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isAdded || isInCart
                            ? 'bg-[#367A55] text-white border-[#367A55]'
                            : 'bg-white hover:bg-[#E8EBE2] text-[#191E1B] border-[#DDE3DA]'
                        }`}
                        title={isInCart ? 'In your cart' : 'Add to cart'}
                        aria-label={`Add ${service.name} to cart`}
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4 animate-scale-in" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>

                      {/* Book Directly */}
                      <button
                        type="button"
                        onClick={() => navigate(`/services/${service.id}`)}
                        className="px-4 py-2.5 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom catalogue prompt */}
        <div className="pt-2 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#DDE3DA] hover:border-[#173D32] text-xs sm:text-sm font-bold text-[#173D32] transition-all shadow-2xs hover:shadow-xs"
          >
            <span>Explore all 50+ verified home repair services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
