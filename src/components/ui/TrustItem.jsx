import clsx from 'clsx';

export function TrustItem({
  icon: Icon,
  title,
  description,
  variant = 'teal',
  className = '',
}) {
  const iconVariants = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200/60',
    indigo: 'bg-teal-50 text-teal-800 border-teal-200/60',
    charcoal: 'bg-neutral-800 text-teal-400 border-neutral-700',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  };

  return (
    <div className={clsx('flex items-start gap-4 p-5 rounded-2xl bg-white border border-neutral-200/70 shadow-xs', className)}>
      {Icon && (
        <div
          className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border',
            iconVariants[variant] || iconVariants.teal
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <h3 className="text-sm font-bold text-neutral-900 tracking-tight">{title}</h3>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
