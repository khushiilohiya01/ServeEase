import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Clock,
  Users,
} from 'lucide-react';
import { PRICING_SERVICES, APARTMENT_SIZES } from '../../data/siteContent';

export function TransparentPricing() {
  const [selectedServiceId, setSelectedServiceId] = useState('cleaning');
  const [sizeLevel, setSizeLevel] = useState(2); // Default to 2 BHK
  const [displayPrice, setDisplayPrice] = useState(2299);
  const prevPriceRef = useRef(2299);

  const activeService =
    PRICING_SERVICES.find((s) => s.id === selectedServiceId) || PRICING_SERVICES[0];
  const activeSize =
    APARTMENT_SIZES.find((s) => s.level === sizeLevel) || APARTMENT_SIZES[1];
  const rateInfo = activeService.rates[sizeLevel];

  // Smooth price number animation when service or apartment size changes
  useEffect(() => {
    const targetPrice = rateInfo.price;
    let startTimestamp = null;
    const initialPrice = prevPriceRef.current;
    const duration = 250; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.round(initialPrice + (targetPrice - initialPrice) * progress);
      setDisplayPrice(current);
      prevPriceRef.current = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [rateInfo.price]);

  return (
    <section className="container-custom" aria-labelledby="pricing-heading">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] font-bold tracking-[0.14em] text-neutral-500 uppercase block mb-1">
            Transparent Pricing
          </span>
          <h2
            id="pricing-heading"
            className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight"
          >
            Instant Estimate by Home Size
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xl mx-auto leading-relaxed">
            Choose your apartment size and service to view upfront fixed rates with guaranteed turnaround times.
          </p>
        </div>

        {/* Centered White Estimation Card */}
        <div className="bg-white rounded-[28px] border border-neutral-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Controls: Service selector & Home Size slider */}
            <div className="md:col-span-7 space-y-6">
              {/* Service Dropdown */}
              <div>
                <label
                  htmlFor="pricing-service-select"
                  className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2"
                >
                  Select Service
                </label>
                <div className="relative">
                  <select
                    id="pricing-service-select"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-neutral-50 px-4 py-3 pr-10 text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 transition-all cursor-pointer"
                  >
                    {PRICING_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1.5 italic">
                  Inclusions: {activeService.inclusions}
                </p>
              </div>

              {/* Apartment / Room Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="pricing-size-slider"
                    className="block text-xs font-bold text-neutral-800 uppercase tracking-wider"
                  >
                    Apartment / Home Size: <span className="text-teal-700 font-bold">{activeSize.label}</span>
                  </label>
                  <span className="text-xs font-semibold text-neutral-500">
                    {activeSize.subtitle}
                  </span>
                </div>

                {/* Range Slider */}
                <div className="pt-2 pb-1">
                  <input
                    id="pricing-size-slider"
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={sizeLevel}
                    onChange={(e) => setSizeLevel(Number(e.target.value))}
                    aria-valuemin="1"
                    aria-valuemax="4"
                    aria-valuenow={sizeLevel}
                    aria-valuetext={activeSize.label}
                    className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                  />
                </div>

                {/* Step Indicators */}
                <div className="flex justify-between items-center text-xs pt-1">
                  {APARTMENT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSizeLevel(size.level)}
                      className={`text-center transition-colors cursor-pointer ${
                        sizeLevel === size.level
                          ? 'font-bold text-teal-700'
                          : 'text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      <span className="block text-xs">{size.label}</span>
                    </button>
                  ))}
                </div>

                {/* Room layout detail pill */}
                <div className="mt-3 py-2 px-3 rounded-xl bg-neutral-100/70 border border-neutral-200/60 text-xs text-neutral-600">
                  <span className="font-semibold text-neutral-800">Typical Scope: </span>
                  {activeSize.rooms}
                </div>
              </div>
            </div>

            {/* Right Display: Calculated Price & Booking CTA */}
            <div className="md:col-span-5 bg-gradient-to-b from-teal-50/50 via-white to-emerald-50/30 rounded-2xl p-6 border border-teal-100 text-center flex flex-col justify-between h-full">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-[11px] font-bold tracking-wide uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flat Rate Estimate</span>
                </span>

                <div className="py-2" aria-live="polite" aria-atomic="true">
                  <p className="text-xs text-neutral-500 font-medium">Estimated Starting Price</p>
                  <div className="flex items-baseline justify-center gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                      ₹{displayPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      ₹{rateInfo.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Save ₹{(rateInfo.originalPrice - rateInfo.price).toLocaleString('en-IN')} with instant online booking
                  </p>
                </div>

                {/* Scope & Crew */}
                <div className="grid grid-cols-2 gap-2 text-left pt-3 mt-3 border-t border-teal-100/80 text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="text-[11px]">{rateInfo.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="text-[11px]">{rateInfo.crew}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Link
                  to={`/booking/${activeService.serviceId}?size=${activeSize.id}`}
                  className="block w-full"
                >
                  <button
                    type="button"
                    className="w-full py-3.5 px-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Book for {activeSize.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <p className="text-[10px] text-neutral-400 mt-2">
                  Sample pricing estimate • Final quote confirmed at checkout
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Inclusions Bar (Mandated in PDF Section 06) */}
          <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-900">No hidden charges</p>
                <p className="text-[11px] text-neutral-500">What you see is what you pay</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-900">Pay after the job</p>
                <p className="text-[11px] text-neutral-500">Inspect before releasing payment</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-900">30-day rework guarantee</p>
                <p className="text-[11px] text-neutral-500">Free revisits if unsatisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
