import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className = '',
    type = 'button',
    icon: Icon,
    iconPosition = 'left',
    ...props
  },
  ref
) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-out cursor-pointer disabled:cursor-not-allowed select-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary:
      'btn-shine bg-[#173D32] text-white hover:bg-[#245544] active:bg-[#0a1f18] shadow-xs hover:shadow-md hover:-translate-y-px disabled:bg-[#173D32]/40 disabled:shadow-none focus-visible:outline-[#173D32]',
    secondary:
      'border border-[#DDE3DA] bg-white text-[#173D32] hover:bg-[#F7F7F2] hover:border-[#173D32]/50 shadow-2xs hover:shadow-xs disabled:border-[#DDE3DA]/60 disabled:text-[#66716A]/50 focus-visible:outline-[#173D32]',
    outline:
      'border border-[#173D32] bg-transparent text-[#173D32] hover:bg-[#E8EBE2]/60 disabled:border-[#DDE3DA] disabled:text-[#66716A]/50 focus-visible:outline-[#173D32]',
    ghost:
      'text-[#191E1B] hover:text-[#173D32] hover:bg-[#E8EBE2]/60 disabled:text-[#66716A]/40 focus-visible:outline-[#173D32]',
    danger:
      'bg-[#B54848] text-white hover:bg-[#9c3a3a] shadow-xs disabled:bg-[#B54848]/40 focus-visible:outline-[#B54848]',
    teal:
      'btn-shine bg-[#173D32] text-white hover:bg-[#245544] shadow-xs disabled:bg-[#173D32]/40 focus-visible:outline-[#173D32]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px] font-semibold',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px] font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[52px] font-bold',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-60 pointer-events-none',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
});
