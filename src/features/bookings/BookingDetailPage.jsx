import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ShieldCheck,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDateTime, getStatusBadgeVariant } from '../../lib/formatters';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { DateSlotPicker } from '../../components/booking/DateSlotPicker';
import { Skeleton } from '../../components/ui/Skeleton';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';
import toast from 'react-hot-toast';
import { addDays, isSlotInPast, slotToISO, toDateKey } from '../../lib/dates';

export function BookingDetailPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState(() => toDateKey(addDays(new Date(), 2)));
  const [rescheduleSlot, setRescheduleSlot] = useState('02:00 PM - 04:00 PM');
  const [isUpdating, setIsUpdating] = useState(false);

  const [isCancelOpen, setIsCancelOpen] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      setIsLoading(true);
      try {
        const res = await apiRequest(`/bookings/${bookingId}`);
        setBooking(res?.data);
      } catch (err) {
        toast.error(err.message || 'Error loading booking');
      } finally {
        setIsLoading(false);
      }
    }
    loadBooking();
  }, [bookingId]);

  const handleConfirmReschedule = async () => {
    if (isSlotInPast(rescheduleDate, rescheduleSlot)) {
      toast.error('That slot has already started. Please pick a later one.');
      return;
    }
    setIsUpdating(true);
    try {
      const newScheduledAt = slotToISO(rescheduleDate, rescheduleSlot);
      const res = await apiRequest(`/bookings/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          scheduled_at: newScheduledAt,
        }),
      });
      setBooking(res?.data);
      setIsRescheduleOpen(false);
      toast.success('Appointment successfully rescheduled!');
    } catch (err) {
      toast.error(err.message || 'Failed to reschedule');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmCancel = async () => {
    setIsUpdating(true);
    try {
      const res = await apiRequest(`/bookings/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'cancelled' }),
      });
      setBooking(res?.data);
      setIsCancelOpen(false);
      toast.success('Booking has been cancelled.');
    } catch (err) {
      toast.error(err.message || 'Cancellation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12 space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-neutral-500">Booking details not available.</p>
        <Link to="/bookings" className="text-[#173D32] text-xs font-bold mt-2 inline-block">
          Return to bookings
        </Link>
      </div>
    );
  }

  const badge = getStatusBadgeVariant(booking.status);
  const canModify = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <div className="container-custom py-8 sm:py-12 space-y-6">
      <div className="mb-2">
        <Link
          to="/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66716A] hover:text-[#173D32]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to all bookings
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DDE3DA]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Booking {booking.id}
            </h1>
            <Badge variant={badge.variant} size="md">
              {badge.label}
            </Badge>
          </div>
          <p className="text-xs text-[#66716A]">
            Created on {formatDateTime(booking.created_at)}
          </p>
        </div>

        {canModify && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => setIsRescheduleOpen(true)}
            >
              Reschedule
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={XCircle}
              onClick={() => setIsCancelOpen(true)}
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#DDE3DA] shadow-sm">
            <CardHeader className="pb-3 border-b border-[#DDE3DA]/60">
              <CardTitle className="text-base">Service Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <ServiceSpotIllustration
                  serviceId={booking.service?.id}
                  category={booking.service?.category}
                  aspect="aspect-square"
                  className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{booking.service?.name}</h3>
                  <p className="text-xs text-[#66716A] mt-1">{booking.service?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#DDE3DA]/60 text-xs">
                <div className="p-3 bg-[#F7F7F2] rounded-xl border border-[#DDE3DA] space-y-1">
                  <span className="text-[#66716A] font-bold uppercase tracking-wider block">
                    Scheduled Time
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900 text-sm">
                    <Calendar className="w-4 h-4 text-[#173D32]" />
                    <span>{formatDateTime(booking.scheduled_at)}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F7F2] rounded-xl border border-[#DDE3DA] space-y-1">
                  <span className="text-[#66716A] font-bold uppercase tracking-wider block">
                    Service Address
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900 text-sm">
                    <MapPin className="w-4 h-4 text-[#173D32]" />
                    <span>
                      {booking.address_snapshot?.label}: {booking.address_snapshot?.line1}
                    </span>
                  </div>
                  <span className="text-[#66716A] block text-[11px]">
                    {booking.address_snapshot?.city}, {booking.address_snapshot?.state}{' '}
                    {booking.address_snapshot?.postal_code}
                  </span>
                </div>
              </div>

              {booking.notes && (
                <div className="p-3.5 bg-[#F7F7F2] rounded-xl border border-[#DDE3DA] text-xs text-neutral-700">
                  <span className="font-bold text-[#66716A] uppercase tracking-wider block mb-1">
                    Special Notes / Access Code:
                  </span>
                  <p>{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-[#DDE3DA] shadow-sm">
            <CardHeader className="pb-3 border-b border-[#DDE3DA]/60">
              <CardTitle className="text-base flex items-center justify-between">
                <span>Payment & Invoicing</span>
                <Badge variant={booking.payment?.status === 'succeeded' ? 'success' : 'neutral'} size="sm">
                  {booking.payment?.status || 'PENDING'}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#F7F7F2] rounded-xl border border-[#DDE3DA]">
                <div>
                  <span className="text-[#66716A] block font-medium">Gateway Provider</span>
                  <span className="font-bold text-neutral-800">
                    {booking.payment?.provider || 'Stripe Sandbox Demo'}
                  </span>
                </div>
                <div>
                  <span className="text-[#66716A] block font-medium">Transaction ID</span>
                  <span className="font-mono text-neutral-800 font-semibold truncate block">
                    {booking.payment?.provider_payment_id || `pay_${booking.id}`}
                  </span>
                </div>
                <div>
                  <span className="text-[#66716A] block font-medium">Processed At</span>
                  <span className="font-semibold text-neutral-800">
                    {formatDateTime(booking.payment?.created_at || booking.created_at)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[#66716A]">
                <div className="flex justify-between">
                  <span>Base Rate</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(booking.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (GST 5%)</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(booking.tax_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform & Insurance Fee</span>
                  <span className="font-medium text-neutral-900">{formatCurrency(booking.platform_fee || 49)}</span>
                </div>
                <div className="pt-2 border-t border-[#DDE3DA] flex justify-between text-sm font-bold text-neutral-900">
                  <span>Total Amount Paid</span>
                  <span className="text-base font-bold text-[#173D32]">
                    {formatCurrency(booking.total_amount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-neutral-200/90 shadow-sm p-6 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              ServeEase Guarantee
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Every appointment includes full damage insurance protection and a 100% satisfaction guarantee. If the job is not completed to your standard, a pro will return free of charge.
            </p>
            <div className="pt-3 border-t border-neutral-100">
              <span className="text-neutral-400 block font-medium">Customer Support Hotline</span>
              <span className="font-bold text-neutral-900 text-sm">1800-123-SERVE (Toll Free)</span>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        title="Reschedule Appointment"
        description="Choose a new date and arrival slot for your pro."
      >
        <div className="space-y-6 pt-2">
          <DateSlotPicker
            selectedDate={rescheduleDate}
            onDateChange={setRescheduleDate}
            selectedSlot={rescheduleSlot}
            onSlotChange={setRescheduleSlot}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
            <Button variant="ghost" size="sm" onClick={() => setIsRescheduleOpen(false)}>
              Keep Current
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isUpdating}
              onClick={handleConfirmReschedule}
            >
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this booking?"
      >
        <div className="space-y-4 pt-2 text-xs text-neutral-600">
          <p>
            Cancellations made more than 2 hours before the scheduled appointment window are eligible for a full automatic refund to the original payment method.
          </p>
          <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
            <Button variant="ghost" size="sm" onClick={() => setIsCancelOpen(false)}>
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isUpdating}
              onClick={handleConfirmCancel}
            >
              Yes, Cancel Booking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
