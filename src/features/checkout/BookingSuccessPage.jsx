import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDateTime } from '../../lib/formatters';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';

const BURST_DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return { x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, delay: 0.25 + (i % 3) * 0.04 };
});

// check mark that springs in with a ring of dots bursting out of it
function SuccessCheck() {
  return (
    <div className="relative w-16 h-16 mx-auto mb-4">
      {BURST_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          className={`absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full ${i % 2 ? 'bg-[#A9C9AC]' : 'bg-white'}`}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{ x: dot.x, y: dot.y, opacity: [0, 1, 0], scale: [0, 1, 0.5] }}
          transition={{ duration: 0.9, delay: dot.delay, ease: 'easeOut' }}
        />
      ))}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-white/60"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3, repeat: 2, repeatDelay: 0.6 }}
      />
      <motion.div
        className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
      >
        <CheckCircle2 className="w-10 h-10 text-white" />
      </motion.div>
    </div>
  );
}

export function BookingSuccessPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSuccessDetails() {
      setIsLoading(true);
      try {
        const res = await apiRequest(`/bookings/${bookingId}`);
        setBooking(res?.data);
      } catch (err) {
        console.error('Failed to load confirmed booking', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSuccessDetails();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="container-custom py-16 flex justify-center">
        <div className="w-full max-w-lg space-y-4">
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 sm:py-20 flex justify-center">
      <div className="w-full max-w-2xl">
        <Card className="border-neutral-200/90 shadow-xl overflow-hidden">
          <div className="bg-emerald-600 text-white p-8 text-center relative overflow-hidden">
            <SuccessCheck />
            <Badge variant="teal" size="sm" className="bg-white/20 text-white border-white/30 mb-2">
              Appointment Confirmed
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Thank You! Your Booking is Set.
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto mt-2">
              A certified technician has been assigned and will arrive at your specified time window.
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
              <div>
                <span className="text-neutral-400 block font-medium">Booking ID</span>
                <span className="font-bold text-neutral-900">{booking?.id || bookingId}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-medium">Payment Status</span>
                <span className="font-bold text-emerald-600">
                  {booking?.payment?.status?.toUpperCase() || 'CONFIRMED'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block font-medium">Total Paid</span>
                <span className="font-bold text-neutral-900">
                  {formatCurrency(booking?.total_amount || 0)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Appointment Summary
              </h3>

              <div className="p-4 rounded-xl border border-neutral-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-neutral-900">
                    {booking?.service?.name}
                  </span>
                  <Badge variant="success" size="sm">
                    {booking?.status?.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    <span>{formatDateTime(booking?.scheduled_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>2-Hour Guaranteed Arrival</span>
                  </div>
                </div>

                {booking?.address_snapshot && (
                  <div className="flex items-start gap-2 text-neutral-600 pt-2 border-t border-neutral-100">
                    <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <span>
                      {booking.address_snapshot.label}: {booking.address_snapshot.line1},{' '}
                      {booking.address_snapshot.city}, {booking.address_snapshot.state}{' '}
                      {booking.address_snapshot.postal_code}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 text-xs text-teal-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                What happens next?
              </div>
              <p className="text-neutral-600 leading-relaxed">
                You will receive an automated appointment confirmation. The technician will send an SMS alert 30 minutes before arrival. You can reschedule or manage this booking at any time from your portal.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link to="/bookings" className="flex-1">
                <Button variant="primary" size="md" className="w-full" icon={FileCheck}>
                  View in My Bookings
                </Button>
              </Link>
              <Link to="/dashboard" className="flex-1">
                <Button variant="outline" size="md" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
