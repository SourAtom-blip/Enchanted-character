import { Link } from 'react-router-dom';

export default function ShimmerButton({
  children,
  as = 'button',
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ...rest
}) {
  const base =
    'shimmer-btn font-label-md text-label-md uppercase tracking-widest transition-transform duration-200 hover:scale-105 inline-flex items-center justify-center gap-2 rounded-full';

  const variants = {
    primary: 'bg-secondary text-on-secondary px-10 py-4',
    dark: 'bg-on-surface text-surface px-8 py-4 hover:bg-secondary transition-colors',
    ghost: 'border border-tertiary text-tertiary px-10 py-4 hover:bg-tertiary/10 transition-colors',
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
