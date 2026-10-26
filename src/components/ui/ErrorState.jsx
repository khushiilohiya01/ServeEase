import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred while fetching the latest data.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`text-center py-12 px-4 rounded-2xl border border-rose-200 bg-rose-50/30 ${className}`}>
      <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-neutral-800">{title}</h3>
      <p className="text-sm text-neutral-600 max-w-md mx-auto mt-1 mb-6">
        {description}
      </p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
