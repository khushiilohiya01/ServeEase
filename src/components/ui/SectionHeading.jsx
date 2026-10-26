export function SectionHeading({
  badge,
  title,
  subtitle,
  actions,
  align = 'left',
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={`mb-8 sm:mb-12 flex flex-col ${
        isCentered
          ? 'items-center text-center max-w-2xl mx-auto'
          : 'md:flex-row md:items-end md:justify-between'
      } gap-4 ${className}`}
    >
      <div className={isCentered ? 'text-center' : ''}>
        {badge && <div className="mb-2.5 inline-block">{badge}</div>}
        <h2 className="heading-section text-[#191E1B]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-base text-[#66716A] leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {actions && !isCentered && (
        <div className="shrink-0 flex items-center gap-3">{actions}</div>
      )}
    </div>
  );
}
