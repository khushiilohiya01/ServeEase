import { forwardRef } from 'react';
import clsx from 'clsx';

export const Textarea = forwardRef(function Textarea(
  {
    label,
    error,
    helperText,
    id,
    name,
    rows = 3,
    className = '',
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <textarea
          ref={ref}
          id={textareaId}
          name={name}
          rows={rows}
          disabled={disabled}
          required={required}
          className={clsx(
            'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-150',
            'focus:outline-hidden focus:ring-2 focus:ring-teal-700 focus:border-teal-700',
            error
              ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:ring-rose-500'
              : 'border-neutral-200 hover:border-neutral-300',
            disabled && 'bg-neutral-100 text-neutral-400 cursor-not-allowed',
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});
