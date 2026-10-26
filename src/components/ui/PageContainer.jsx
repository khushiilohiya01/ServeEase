import clsx from 'clsx';

export function PageContainer({
  children,
  className = '',
  size = 'default',
  as: Component = 'div',
  ...props
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1240px]',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={clsx(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
