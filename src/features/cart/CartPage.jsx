import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/formatters';
import { PAYMENT_PROMISE, GUARANTEE_PROMISE } from '../../lib/constants';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';

export function CartPage() {
  const { items, removeFromCart, updateBhk, subtotal, tax, platformFee, total } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // Gate through sign in/sign up with explicit return path
      openAuthModal('signin');
      localStorage.setItem('serveease_auth_return_to', '/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 sm:py-24 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#DDE4DB] shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EDE7] border border-[#DDE4DB] text-[#173D32] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#191E1B] tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-[#647269] leading-relaxed">
            Browse our verified home maintenance and repair services to book a technician.
          </p>
          <div className="pt-2">
            <Link to="/services">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#191E1B] tracking-tight">
          Your Service Cart ({items.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#647269] mt-1">
          Review your selected services, customize apartment size where applicable, and proceed to checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <Card key={item.cartItemId} className="p-5 border-[#DDE4DB] bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <ServiceSpotIllustration
                    serviceId={item.serviceId || item.id}
                    category={item.category}
                    aspect="aspect-square"
                    className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#173D32] bg-[#E8EDE7] px-2.5 py-0.5 rounded-full border border-[#DDE4DB]/60">
                      {item.category?.replace('_', ' ')}
                    </span>
                    <h3 className="text-base font-semibold text-[#191E1B] mt-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#647269] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>

                    {/* BHK Selector - Strictly only for the 3 size-based services */}
                    {item.isBhkEligible && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#191E1B]">
                          Apartment Size:
                        </span>
                        <div className="inline-flex rounded-lg border border-[#DDE4DB] bg-[#F7F8F4] p-0.5">
                          {[1, 2, 3, 4].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => updateBhk(item.cartItemId, level)}
                              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                                item.bhk === level
                                  ? 'bg-[#173D32] text-white shadow-xs'
                                  : 'text-[#647269] hover:text-[#191E1B]'
                              }`}
                            >
                              {level} BHK
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#DDE4DB]/60">
                  <span className="text-lg font-bold text-[#191E1B]">
                    {formatCurrency(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 text-[#647269] hover:text-[#B54848] rounded-lg hover:bg-rose-50 transition-colors cursor-pointer mt-1"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary & Checkout Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#DDE4DB] shadow-sm space-y-5">
          <h2 className="text-base font-bold text-[#191E1B] border-b border-[#DDE4DB]/60 pb-3">
            Payment Summary
          </h2>

          <div className="space-y-2.5 text-xs text-[#647269]">
            <div className="flex justify-between">
              <span>Service Subtotal</span>
              <span className="font-semibold text-[#191E1B]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Taxes (5%)</span>
              <span className="font-semibold text-[#191E1B]">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Doorstep Platform & Safety Fee</span>
              <span className="font-semibold text-[#191E1B]">{formatCurrency(platformFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#DDE4DB]/60 flex justify-between items-baseline text-sm">
              <span className="font-bold text-[#191E1B]">Total Payable</span>
              <span className="text-xl font-bold text-[#173D32]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-xs"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>

          {/* Business Approved Payment Promise & Guarantee */}
          <div className="pt-3 border-t border-[#DDE4DB]/60 space-y-2.5">
            <div className="flex items-start gap-2 text-[11px] text-[#647269]">
              <CreditCard className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
              <span>{PAYMENT_PROMISE}</span>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-[#647269]">
              <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
              <span>{GUARANTEE_PROMISE}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
