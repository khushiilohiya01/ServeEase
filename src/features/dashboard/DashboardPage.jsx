import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  Plus,
  ArrowRight,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDateTime } from '../../lib/formatters';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';

export function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      try {
        const [bookingsRes, paymentsRes] = await Promise.all([
          apiRequest('/bookings'),
          apiRequest('/payments'),
        ]);
        setBookings(bookingsRes?.data || []);
        setPayments(paymentsRes?.data || []);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const upcomingBooking = bookings.find(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const totalSpent = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'there';
  const hasBookings = bookings.length > 0;

  if (isLoading) {
    return (
      <div className="container-custom py-10 space-y-6 min-h-[480px]">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8 sm:py-12 space-y-8 min-h-[520px]">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            {hasBookings ? `Welcome back, ${firstName} 👋` : `Welcome, ${firstName} 👋`}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {hasBookings
              ? 'Here is your live overview of active appointments and service history.'
              : 'Book your first verified doorstep service in minutes.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/services">
            <Button variant="primary" size="sm" icon={Plus}>
              Book New Service
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" icon={User}>
              My Addresses
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid or New User Get-Started Card */}
      {hasBookings ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-5 border-[#DDE3DA]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66716A] uppercase tracking-wider">
                Upcoming Bookings
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E8EBE2] text-[#173D32] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-neutral-900">
                {bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length}
              </span>
              <span className="text-xs text-[#66716A] block mt-0.5">Active schedule</span>
            </div>
          </Card>

          <Card className="p-5 border-[#DDE3DA]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66716A] uppercase tracking-wider">
                Completed Services
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#367A55]/10 text-[#367A55] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-neutral-900">
                {completedCount}
              </span>
              <span className="text-xs text-[#66716A] block mt-0.5">Total jobs fulfilled</span>
            </div>
          </Card>

          <Card className="p-5 border-[#DDE3DA]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#66716A] uppercase tracking-wider">
                Total Spent
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#E8EBE2] text-[#173D32] flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-neutral-900">
                {formatCurrency(totalSpent)}
              </span>
              <span className="text-xs text-[#66716A] block mt-0.5">Across {payments.length} orders</span>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-[#E8EBE2]/60 via-white to-[#A9C9AC]/20 border-[#DDE3DA]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8EBE2] text-[#173D32] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Get started with ServeEase
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900">
                Doorstep home repairs and deep cleaning, backed by verified pros
              </h2>
              <p className="text-xs sm:text-sm text-[#66716A] leading-relaxed">
                Choose from 50+ vetted home maintenance services across 8 primary categories. Pay after service completion with our 30-day rework warranty.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <Link to="/services">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Next Upcoming Booking Card */}
      {upcomingBooking ? (
        <Card className="border-[#DDE3DA] bg-gradient-to-r from-[#E8EBE2]/40 via-white to-white shadow-sm overflow-hidden">
          <CardHeader className="border-b border-[#DDE3DA]/60 pb-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="forest" size="sm" dot>
                Next Appointment
              </Badge>
              <span className="text-xs text-[#66716A] font-medium">#{upcomingBooking.id}</span>
            </div>
            <Link to={`/bookings/${upcomingBooking.id}`}>
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View Full Details
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <ServiceSpotIllustration
                  serviceId={upcomingBooking.service?.id}
                  category={upcomingBooking.service?.category}
                  aspect="aspect-square"
                  className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                    {upcomingBooking.service?.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#66716A] mt-2">
                    <span className="flex items-center gap-1.5 font-semibold text-neutral-900">
                      <Calendar className="w-4 h-4 text-[#173D32]" />
                      {formatDateTime(upcomingBooking.scheduled_at)}
                    </span>
                    {upcomingBooking.address_snapshot && (
                      <span className="flex items-center gap-1.5 text-[#66716A]">
                        <MapPin className="w-4 h-4 text-[#66716A]" />
                        {upcomingBooking.address_snapshot.line1}, {upcomingBooking.address_snapshot.city}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link to={`/bookings/${upcomingBooking.id}`}>
                  <Button variant="outline" size="sm">
                    Manage / Reschedule
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : hasBookings ? (
        <Card className="p-8 text-center bg-white border-[#DDE3DA]">
          <div className="max-w-md mx-auto space-y-3">
            <Sparkles className="w-8 h-8 text-[#173D32] mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">No active appointments</h3>
            <p className="text-xs text-[#66716A]">
              Need a deep clean, an AC tune-up, or a plumbing check? Book a pro in minutes.
            </p>
            <Link to="/services">
              <Button variant="primary" size="sm" className="mt-2">
                Browse Services Catalog
              </Button>
            </Link>
          </div>
        </Card>
      ) : null}

      {/* Recent Bookings Mini List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-900">
            Recent Service Appointments
          </h2>
          {bookings.length > 0 && (
            <Link
              to="/bookings"
              className="text-xs font-bold text-[#173D32] hover:text-[#245544] flex items-center gap-1"
            >
              All bookings ({bookings.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((b) => (
              <Link
                key={b.id}
                to={`/bookings/${b.id}`}
                className="block p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-700">
                      #{b.id}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{b.service?.name}</h4>
                      <p className="text-neutral-500">{formatDateTime(b.scheduled_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-bold text-neutral-900 text-sm">
                      {formatCurrency(b.total_amount)}
                    </span>
                    <Badge
                      variant={
                        b.status === 'confirmed'
                          ? 'success'
                          : b.status === 'completed'
                          ? 'teal'
                          : b.status === 'cancelled'
                          ? 'danger'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {b.status}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-neutral-200/80 text-center space-y-2">
            <p className="text-sm font-semibold text-neutral-800">No service appointments scheduled yet.</p>
            <p className="text-xs text-neutral-500">Explore our vetted services and schedule your first visit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
