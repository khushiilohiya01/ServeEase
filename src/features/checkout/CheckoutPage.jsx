import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Calendar,
  MapPin,
  CheckCircle,
  ChevronLeft,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDuration } from '../../lib/formatters';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Skeleton } from '../../components/ui/Skeleton';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';
import toast from 'react-hot-toast';

export function CheckoutPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card_sandbox');

  // Simulated test card form state
  const [cardData, setCardData] = useState({
    name: 'Alex Rivera',
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '•••',
  });

  useEffect(() => {
    async function loadBooking() {
      setIsLoading(true);
      try {
        const res = await apiRequest(`/bookings/${bookingId}`);
        const data = res?.data;
        setBooking(data);

        // If already paid, redirect straight to success
        if (data?.payment && data?.payment.status === 'succeeded') {
          navigate(`/booking-success/${bookingId}`, { replace: true });
        }
      } catch (err) {
        toast.error(err.message || 'Unable to load booking details');
      } finally {
        setIsLoading(false);
      }
    }

    loadBooking();
  }, [bookingId, navigate]);

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    try {
      // 1. Initiate checkout session from server
      await apiRequest('/payments/checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          booking_id: Number(bookingId),
          payment_method: paymentMethod,
        }),
      });

      // 2. Complete payment confirmation callback
      await apiRequest('/payments/confirm', {
        method: 'POST',
        body: JSON.stringify({
          booking_id: Number(bookingId),
          provider: 'stripe_sandbox_demo',
          order_id: `ord_${Date.now()}`,
          payment_id: `pay_${Date.now()}`,
        }),
      });

      toast.success('Payment authorized successfully! Your booking is confirmed.');
      navigate(`/booking-success/${bookingId}`);
    } catch (err) {
      toast.error(err.message || 'Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-neutral-500">Booking not found.</p>
        <Link to="/services" className="text-[#173D32] text-xs font-bold mt-2 inline-block">
          Explore Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="mb-6">
        <Link
          to={`/booking/${booking.service_id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66716A] hover:text-[#173D32]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to booking schedule
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge variant="forest" size="sm" className="mb-2">
            Secure Checkout
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191E1B] tracking-tight">
            Finalize Your Booking & Payment
          </h1>
          <p className="text-xs sm:text-sm text-[#647269] mt-1">
            Booking ID: {booking.id} • Authenticated server session
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Payment Method Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#DDE4DB] shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Payment Method</span>
                  <div className="flex items-center gap-1 text-xs text-[#647269] font-normal">
                    <Lock className="w-3.5 h-3.5 text-[#173D32]" />
                    <span>256-Bit Encrypted</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Payment Notice */}
                <div className="p-4 rounded-xl bg-[#E8EDE7]/60 border border-[#DDE4DB] text-xs text-[#173D32] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-[#173D32]">
                    <ShieldCheck className="w-4 h-4 text-[#173D32]" />
                    Instant Secure Payment Gateway (Demo)
                  </div>
                  <p className="text-[#647269]">
                    Supports UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and NetBanking. No real money will be charged.
                  </p>
                </div>

                {/* Option 1: Card / UPI */}
                <div
                  onClick={() => setPaymentMethod('card_sandbox')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'card_sandbox'
                      ? 'border-[#173D32] bg-[#E8EDE7]/40 ring-2 ring-[#173D32]/20'
                      : 'border-[#DDE4DB] bg-white hover:border-[#173D32]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-5 h-5 text-[#173D32]" />
                      <span className="text-sm font-semibold text-[#191E1B]">
                        Credit / Debit Card / UPI
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#173D32] bg-[#E8EDE7] px-2 py-0.5 rounded">
                      Fast Checkout
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Input
                      label="Cardholder / Payer Name"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      disabled
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Card Number / UPI ID"
                        value={cardData.number}
                        disabled
                      />
                      <Input
                        label="Expires / CVV"
                        value={`${cardData.expiry} • ${cardData.cvv}`}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* Option 2: Pay After Service Completed */}
                <div
                  onClick={() => setPaymentMethod('pay_later')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === 'pay_later'
                      ? 'border-[#173D32] bg-[#E8EDE7]/40 ring-2 ring-[#173D32]/20'
                      : 'border-[#DDE4DB] bg-white hover:border-[#173D32]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-5 h-5 text-[#647269]" />
                      <div>
                        <span className="text-sm font-semibold text-[#191E1B] block">
                          Pay Upon Pro Arrival & Completion
                        </span>
                        <span className="text-xs text-[#647269]">
                          Direct digital payment after you inspect completed work.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full text-base font-semibold shadow-md"
                    isLoading={isProcessing}
                    onClick={handleProcessPayment}
                    icon={Lock}
                  >
                    Confirm & Authorize {formatCurrency(booking.total_amount)}
                  </Button>
                  <p className="text-center text-[11px] text-[#647269] mt-2.5">
                    Demo Mode: Simulated transaction only. By clicking Confirm, you agree to ServeEase terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Details */}
          <div className="space-y-6">
            <Card className="border-[#DDE3DA] shadow-sm">
              <CardHeader className="pb-3 border-b border-[#DDE3DA]/60">
                <CardTitle className="text-sm font-bold">Booking Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-xs">
                {/* Service Details */}
                <div className="flex gap-3 pb-3 border-b border-[#DDE3DA]/60">
                  <ServiceSpotIllustration
                    serviceId={booking.service?.id}
                    category={booking.service?.category}
                    aspect="aspect-square"
                    className="w-14 h-14 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900 line-clamp-1">
                      {booking.service?.name}
                    </h4>
                    <p className="text-[#66716A] mt-0.5">
                      Est. {formatDuration(booking.service?.duration_minutes)}
                    </p>
                  </div>
                </div>

                {/* Schedule & Address */}
                <div className="space-y-2 py-1">
                  <div className="flex items-start gap-2 text-[#66716A]">
                    <Calendar className="w-3.5 h-3.5 text-[#66716A] shrink-0 mt-0.5" />
                    <span>{booking.scheduled_at}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#66716A]">
                    <MapPin className="w-3.5 h-3.5 text-[#66716A] shrink-0 mt-0.5" />
                    <span>
                      {booking.address_snapshot?.line1}, {booking.address_snapshot?.city}
                    </span>
                  </div>
                </div>

                {/* Pricing Line Items */}
                <div className="space-y-2 pt-3 border-t border-[#DDE3DA]/60 text-[#66716A]">
                  <div className="flex justify-between">
                    <span>Base Service</span>
                    <span className="font-medium text-neutral-900">
                      {formatCurrency(booking.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applicable Taxes (GST 5%)</span>
                    <span className="font-medium text-neutral-900">
                      {formatCurrency(booking.tax_amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety & Platform Fee</span>
                    <span className="font-medium text-neutral-900">
                      {formatCurrency(booking.platform_fee || 49)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DDE3DA] flex justify-between items-baseline text-sm font-bold text-neutral-900">
                    <span>Total Amount</span>
                    <span className="text-xl font-bold text-[#173D32]">
                      {formatCurrency(booking.total_amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
