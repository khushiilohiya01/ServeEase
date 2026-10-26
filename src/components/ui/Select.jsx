import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const Select = forwardRef(function Select(
  {
    label,
    error,
    helperText,
    id,
    name,
    options = [],
    children,
    className = '',
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          required={required}
          className={clsx(
            'block w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-[#191E1B] transition-colors duration-150',
            'focus:outline-hidden focus:ring-2 focus:ring-[#173D32]/20 focus:border-[#173D32]',
            error
              ? 'border-[#B54848] bg-[#B54848]/5 text-[#B54848] focus:ring-[#B54848]/20 focus:border-[#B54848]'
              : 'border-[#DDE3DA] hover:border-[#173D32]/40',
            disabled && 'bg-[#E8EBE2]/40 text-[#66716A] border-[#DDE3DA] cursor-not-allowed',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
          <ChevronDown className="h-4 w-4" />
        </div>
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
