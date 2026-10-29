import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from '../../lib/apiClient';
import { PageHeader } from '../../components/ui/PageHeader';
import { ServiceFilters } from '../../components/services/ServiceFilters';
import { ServiceGrid } from '../../components/services/ServiceGrid';
import { Badge } from '../../components/ui/Badge';

export function ServicesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryQ = searchParams.get('q') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const queryRoom = searchParams.get('room') || 'all';
  const querySort = searchParams.get('sort') || 'recommended';

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (queryQ) params.append('q', queryQ);
        if (queryCategory && queryCategory !== 'all') params.append('category', queryCategory);
        if (queryRoom && queryRoom !== 'all') params.append('room', queryRoom);
        if (querySort) params.append('sort', querySort);

        const endpoint = `/services${params.toString() ? `?${params.toString()}` : ''}`;
        const res = await apiRequest(endpoint);
        setServices(res?.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch services list');
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, [queryQ, queryCategory, queryRoom, querySort]);

  const updateSearchParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'recommended') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="container-custom py-8 sm:py-12">
      <PageHeader
        badge={
          <Badge variant="primary" size="sm">
            Catalog & Discovery
          </Badge>
        }
        title="Explore Verified Home Services"
        description="Book certified electricians, plumbers, deep cleaners, and technicians with clear, upfront pricing."
      />

      <ServiceFilters
        searchQuery={queryQ}
        selectedCategory={queryCategory}
        selectedRoom={queryRoom}
        selectedSort={querySort}
        onSearchChange={(val) => updateSearchParam('q', val)}
        onCategoryChange={(val) => updateSearchParam('category', val)}
        onRoomChange={(val) => updateSearchParam('room', val)}
        onSortChange={(val) => updateSearchParam('sort', val)}
        onReset={handleReset}
        totalResults={services.length}
      />

      <ServiceGrid
        services={services}
        isLoading={isLoading}
        error={error}
        onRetry={() => window.location.reload()}
        onClearFilters={handleReset}
      />

      <div className="mt-12 pt-8 border-t border-[#DDE4DB] text-center">
        <p className="text-sm font-semibold text-[#173D32] bg-[#F7F8F4] inline-block px-5 py-2.5 rounded-full border border-[#DDE4DB]/80 shadow-2xs">
          Pay after the job · UPI or cash · Spare parts at MRP · 30-day warranty
        </p>
      </div>
    </div>
  );
}
