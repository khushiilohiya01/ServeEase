import clsx from 'clsx';

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border border-[#DDE3DA] shadow-xs transition-all duration-200 overflow-hidden',
        hover && 'hover:shadow-md hover:border-[#173D32]/40 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={clsx('p-5 sm:p-6 border-b border-[#DDE3DA]/80', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', as: Component = 'h3', ...props }) {
  return (
    <Component className={clsx('text-lg font-bold text-[#191E1B] tracking-tight', className)} {...props}>
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={clsx('text-sm text-[#66716A] mt-1 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={clsx('p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={clsx('p-4 sm:p-6 bg-[#F7F7F2]/60 border-t border-[#DDE3DA]/80 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
