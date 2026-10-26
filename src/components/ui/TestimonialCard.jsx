import { Star, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export function TestimonialCard({
  author,
  role = 'Verified Homeowner',
  serviceName,
  content,
  rating = 5,
  date,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-neutral-300',
        className
      )}
    >
      <div>
        {/* Star Rating & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center text-amber-400 gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  'w-4 h-4',
                  i < rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'
                )}
              />
            ))}
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Verified Booking
          </div>
        </div>

        {/* Review body */}
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
          "{content}"
        </p>
      </div>

      {/* Author and service details */}
      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-neutral-900">{author}</h4>
          <p className="text-[11px] text-neutral-500">
            {role}
            {date ? ` • ${date}` : ''}
          </p>
        </div>
        {serviceName && (
          <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
            {serviceName}
          </span>
        )}
      </div>
    </div>
  );
}
