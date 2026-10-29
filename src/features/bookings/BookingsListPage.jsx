import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { formatCurrency, formatDateTime, getStatusBadgeVariant } from '../../lib/formatters';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';

export function BookingsListPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      setIsLoading(true);
      try {
        const query = selectedFilter !== 'all' ? `?status=${selectedFilter}` : '';
        const res = await apiRequest(`/bookings${query}`);
        setBookings(res?.data || []);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, [selectedFilter]);

  const filterTabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="container-custom py-8 sm:py-12 space-y-8">
      <PageHeader
        badge={
          <Badge variant="primary" size="sm">
            Customer Portal
          </Badge>
        }
        title="My Service Appointments"
        description="Track, reschedule, or review all scheduled home service appointments."
        actions={
          <Link to="/services">
            <Button variant="primary" size="sm" icon={Plus}>
              Book New Service
            </Button>
          </Link>
        }
      />

      {(!isLoading && (bookings.length > 0 || selectedFilter !== 'all')) && (
        <div className="flex gap-2 border-b border-neutral-200 pb-2 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#173D32] text-white shadow-xs'
                    : 'text-[#66716A] hover:text-[#173D32] hover:bg-[#E8EBE2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4 min-h-[400px]">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="min-h-[380px] flex items-center justify-center">
          <EmptyState
            title="You haven't booked anything yet"
            description="Explore our verified home maintenance and cleaning services to schedule your first appointment."
            actionLabel="Browse Services"
            onAction={() => window.location.assign('/services')}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const badge = getStatusBadgeVariant(b.status);
            return (
              <Card key={b.id} hover className="border-[#DDE3DA] shadow-xs">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <ServiceSpotIllustration
                        serviceId={b.service?.id}
                        category={b.service?.category}
                        aspect="aspect-square"
                        className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-neutral-400">#{b.id}</span>
                          <Badge variant={badge.variant} size="sm">
                            {badge.label}
                          </Badge>
                        </div>
                        <h3 className="text-base font-bold text-neutral-900">
                          {b.service?.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#66716A] mt-2">
                          <span className="flex items-center gap-1.5 font-medium text-neutral-800">
                            <Calendar className="w-3.5 h-3.5 text-[#173D32]" />
                            {formatDateTime(b.scheduled_at)}
                          </span>
                          {b.address_snapshot && (
                            <span className="flex items-center gap-1.5 text-[#66716A]">
                              <MapPin className="w-3.5 h-3.5 text-[#66716A]" />
                              {b.address_snapshot.line1}, {b.address_snapshot.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDE3DA]/60">
                      <div>
                        <span className="text-[11px] text-neutral-400 font-medium block">
                          Total Paid
                        </span>
                        <span className="text-lg font-bold text-neutral-900">
                          {formatCurrency(b.total_amount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to={`/bookings/${b.id}`}>
                          <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                            Manage Booking
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
