import { Loader2 } from 'lucide-react';

export function LoadingState({
  title = 'Loading...',
  description = 'Please wait while we retrieve the latest information.',
  className = '',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`py-16 px-4 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center mb-4 text-teal-700">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <h3 className="text-base font-bold text-neutral-900 tracking-tight">{title}</h3>
      {description && <p className="text-xs text-neutral-500 mt-1 max-w-sm">{description}</p>}
    </div>
  );
}
