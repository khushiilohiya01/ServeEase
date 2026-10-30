import clsx from 'clsx';

export function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={clsx(
        'skeleton-shimmer bg-[#E8EBE2]/80',
        variants[variant] || variants.rectangular,
        className
      )}
      {...props}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-[#DDE3DA] p-5 space-y-4 shadow-xs">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="pt-3 border-t border-[#DDE3DA]/80 flex items-center justify-between">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}
