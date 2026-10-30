import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { ServiceCardSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { listItem } from '../../lib/motion';

// slides a card up as it scrolls into view; index staggers cards in the same row
export function RevealCard({ index = 0, children }) {
  return (
    <motion.div
      className="h-full"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={listItem}
    >
      {children}
    </motion.div>
  );
}

export function ServiceGrid({
  services = [],
  isLoading = false,
  error = null,
  onRetry,
  emptyTitle = 'No services found',
  emptyDescription = 'Try adjusting your search filters or browse other categories.',
  onClearFilters,
  featured = false,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState description={error} onRetry={onRetry} />;
  }

  if (services.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onClearFilters ? 'Reset Filters' : undefined}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <RevealCard key={service.id} index={index % 3}>
          <ServiceCard service={service} featured={featured} />
        </RevealCard>
      ))}
    </div>
  );
}
