import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

export function FormField({
  id,
  label,
  helperText,
  error,
  required = false,
  children,
  className = '',
}) {
  const errorId = id ? `${id}-error` : undefined;
  const helperId = id ? `${id}-helper` : undefined;

  return (
    <div className={clsx('space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-semibold text-neutral-800">
            {label}
            {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
          </label>
          {!required && (
            <span className="text-[11px] text-neutral-400 font-medium">Optional</span>
          )}
        </div>
      )}

      {children}

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-0.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-neutral-500 pt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
