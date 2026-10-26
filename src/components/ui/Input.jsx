import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    type = 'text',
    id,
    name,
    className = '',
    startIcon: StartIcon,
    endIcon: EndIcon,
    disabled = false,
    required = false,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPasswordType = type === 'password';
  const effectiveType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5"
        >
          {label}
          {required && <span className="text-rose-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {StartIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <StartIcon className="h-4 w-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={effectiveType}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined}
          className={clsx(
            'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#191E1B] placeholder:text-[#66716A]/70 transition-colors duration-150',
            'focus:outline-hidden focus:ring-2 focus:ring-[#173D32]/20 focus:border-[#173D32]',
            StartIcon && 'pl-10',
            (EndIcon || isPasswordType) && 'pr-10',
            error
              ? 'border-[#B54848] bg-[#B54848]/5 text-[#B54848] focus:ring-[#B54848]/20 focus:border-[#B54848]'
              : 'border-[#DDE3DA] hover:border-[#173D32]/40',
            disabled && 'bg-[#E8EBE2]/40 text-[#66716A] border-[#DDE3DA] cursor-not-allowed',
            className
          )}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}

        {!isPasswordType && EndIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
            <EndIcon className="h-4 w-4" />
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${inputId}-desc`} className="mt-1.5 text-xs text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
});
