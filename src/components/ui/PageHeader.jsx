export function PageHeader({
  badge,
  title,
  description,
  actions,
  className = '',
}) {
  return (
    <div className={`mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${className}`}>
      <div>
        {badge && <div className="mb-2.5">{badge}</div>}
        <h1 className="heading-section text-[#191E1B]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-base text-[#66716A] max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
