import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ShoppingBag,
  Check,
  Plus,
  Minus,
  Info,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatDuration } from '../../lib/formatters';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { useCart } from '../../context/CartContext';
import { formatPricingDisplay } from '../../data/servicesData';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { addToCart, items, selectedBhk, setSelectedBhk } = useCart();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [unitQuantity, setUnitQuantity] = useState(1);

  useEffect(() => {
    async function fetchDetail() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await apiRequest(`/services/${serviceId}`);
        const data = res?.data || null;
        setService(data);
        if (data?.pricing?.kind === 'per_unit') {
          setUnitQuantity(data.pricing.min || 1);
        }
      } catch (err) {
        setError(err.message || 'Service not found');
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
  }, [serviceId]);

  const handleAddToCart = () => {
    if (!service) return;
    addToCart(service, {
      bhk: selectedBhk,
      quantity: unitQuantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const isInCart = service ? items.some((i) => i.serviceId === service.id) : false;

  if (isLoading) {
    return (
      <div className="container-custom py-10 space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div>
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container-custom py-16">
        <ErrorState
          title="Service Unavailable"
          description={error || 'The requested service could not be found.'}
          onRetry={() => navigate('/services')}
        />
      </div>
    );
  }

  const duration = service.durationMins || service.duration_minutes || 45;
  const inclusions = service.includes || service.inclusions || [];
  const pricing = service.pricing;

  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="mb-6">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#647269] hover:text-[#173D32] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to all services
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-sm bg-[#FAFBF8] border border-[#DDE4DB] p-6 flex items-center justify-center">
            <ServiceSpotIllustration
              serviceId={service.id}
              category={service.category}
              aspect="w-full h-full max-w-sm"
              className="bg-transparent border-none p-0"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="neutral" size="md" className="bg-white/95 backdrop-blur-xs font-semibold text-[#191E1B]">
                {service.category?.replace('_', ' ')}
              </Badge>
              {service.popular && (
                <Badge variant="forest" size="md" className="font-semibold">
                  Popular
                </Badge>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#173D32] bg-[#E8EDE7] px-2.5 py-0.5 rounded-full">
                {service.category?.replace('_', ' ')}
              </span>
              {service.rooms && service.rooms.length > 0 && (
                <span className="text-xs text-[#647269]">
                  For: {service.rooms.join(', ')}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#191E1B] tracking-tight">
              {service.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#647269]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#647269]" />
                <span>Duration: <strong className="text-[#191E1B] font-semibold">{formatDuration(duration)}</strong></span>
              </div>
              <span className="text-[#DDE4DB]">•</span>
              <div className="flex items-center gap-1.5 text-[#173D32]">
                <ShieldCheck className="w-4 h-4 text-[#173D32]" />
                <span className="font-semibold">30-day rework warranty</span>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#647269] leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {service.sparesNote && (
            <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#DDE4DB] text-xs sm:text-sm text-[#191E1B] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold text-[#173D32] mb-0.5">Parts & Materials Policy</strong>
                <span className="text-[#647269]">{service.sparesNote}</span>
              </div>
            </div>
          )}

          {inclusions.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#DDE4DB] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[#191E1B] flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#173D32]" />
                What&apos;s Included in This Service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#191E1B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#173D32] mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#E8EDE7]/60 border border-[#DDE4DB] text-xs text-[#173D32] font-medium text-center">
            Pay after the job · UPI or cash · Spare parts at MRP · 30-day warranty
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <Card className="border-[#DDE4DB] shadow-md bg-white">
            <CardContent className="p-6 space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-[#647269] tracking-wider block mb-1">
                  {pricing?.kind === 'quote'
                    ? 'Pricing model'
                    : pricing?.kind === 'inspection'
                    ? 'Doorstep inspection visit'
                    : 'Total price'}
                </span>

                <div className="text-2xl sm:text-3xl font-bold text-[#191E1B]">
                  {pricing?.kind === 'per_bhk'
                    ? `₹${(pricing.prices[selectedBhk] ?? pricing.prices['2BHK'] ?? 0).toLocaleString('en-IN')}`
                    : pricing?.kind === 'per_unit'
                    ? `₹${(pricing.price * unitQuantity).toLocaleString('en-IN')}`
                    : formatPricingDisplay(pricing, selectedBhk)}
                </div>

                {pricing?.kind === 'inspection' && (
                  <p className="text-xs text-[#173D32] font-semibold mt-1">
                    ✓ Visit charge adjusted against final repair bill
                  </p>
                )}

                {pricing?.kind === 'quote' && (
                  <p className="text-xs text-[#173D32] font-semibold mt-1">
                    ✓ Free technician inspection & exact quote before starting
                  </p>
                )}
              </div>

              {pricing?.kind === 'per_bhk' && (
                <div className="space-y-2 pt-2 border-t border-[#DDE4DB]/70">
                  <label className="text-xs font-semibold text-[#191E1B] block">
                    Select Home Size:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F8F4] border border-[#DDE4DB] rounded-xl">
                    {['1BHK', '2BHK', '3BHK'].map((bhk) => {
                      const isSelected = selectedBhk === bhk;
                      return (
                        <button
                          key={bhk}
                          type="button"
                          onClick={() => setSelectedBhk(bhk)}
                          className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                  {pricing.prices['4BHK+'] && (
                    <button
                      type="button"
                      onClick={() => setSelectedBhk('4BHK+')}
                      className={`w-full py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedBhk === '4BHK+'
                          ? 'bg-[#173D32] text-white border-[#173D32]'
                          : 'border-[#DDE4DB] text-[#647269] hover:text-[#191E1B]'
                      }`}
                    >
                      4BHK+ (₹{pricing.prices['4BHK+'].toLocaleString('en-IN')})
                    </button>
                  )}
                </div>
              )}

              {pricing?.kind === 'per_unit' && (
                <div className="space-y-2 pt-2 border-t border-[#DDE4DB]/70">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#191E1B]">
                    <span>Number of {pricing.unitLabel}s:</span>
                    {pricing.min && <span className="text-[#647269] font-normal">(Min {pricing.min})</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setUnitQuantity((prev) => Math.max((pricing.min || 1), prev - 1))}
                      className="w-9 h-9 rounded-xl border border-[#DDE4DB] bg-white hover:bg-[#F7F8F4] flex items-center justify-center text-[#191E1B] font-bold cursor-pointer transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-bold text-base text-[#191E1B]">
                      {unitQuantity} {pricing.unitLabel}{unitQuantity > 1 ? 's' : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUnitQuantity((prev) => prev + 1)}
                      className="w-9 h-9 rounded-xl border border-[#DDE4DB] bg-white hover:bg-[#F7F8F4] flex items-center justify-center text-[#191E1B] font-bold cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2.5 pt-4 border-t border-[#DDE4DB]/60 text-xs text-[#647269]">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-[#191E1B]">{formatDuration(duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="font-semibold text-[#173D32]">Pay after service</span>
                </div>
                <div className="flex justify-between">
                  <span>Cancellation</span>
                  <span className="font-semibold text-[#173D32]">Free anytime before arrival</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Link to={`/booking/${service.id}`} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Select Slot & Book
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isAdded || isInCart
                      ? 'bg-[#E8EDE7] border-[#173D32] text-[#173D32]'
                      : 'bg-white border-[#DDE4DB] text-[#191E1B] hover:bg-[#F7F8F4]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#367A55]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : isInCart ? (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#173D32]" />
                      <span>In Cart • Add Another</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-[#647269]">
                  Zero advance payment. Inspect the work before paying.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
