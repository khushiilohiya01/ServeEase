import clsx from 'clsx';

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  dot = false,
}) {
  const variants = {
    neutral: 'bg-[#F7F7F2] text-[#66716A] border-[#DDE3DA]',
    primary: 'bg-[#E8EBE2] text-[#173D32] border-[#173D32]/20',
    teal: 'bg-[#E8EBE2] text-[#173D32] border-[#173D32]/20',
    forest: 'bg-[#173D32] text-white border-transparent',
    sage: 'bg-[#A9C9AC]/30 text-[#173D32] border-[#A9C9AC]/40',
    indigo: 'bg-[#E8EBE2] text-[#173D32] border-[#173D32]/20',
    success: 'bg-[#367A55]/10 text-[#367A55] border-[#367A55]/30',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-[#B54848]/10 text-[#B54848] border-[#B54848]/30',
  };

  const dotColors = {
    neutral: 'bg-[#66716A]',
    primary: 'bg-[#173D32]',
    teal: 'bg-[#173D32]',
    forest: 'bg-[#A9C9AC]',
    sage: 'bg-[#173D32]',
    indigo: 'bg-[#173D32]',
    success: 'bg-[#367A55]',
    warning: 'bg-amber-500',
    danger: 'bg-[#B54848]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase',
        variants[variant] || variants.neutral,
        sizes[size] || sizes.md,
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant] || dotColors.neutral)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
