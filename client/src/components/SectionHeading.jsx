export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-16 max-w-xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-2">{eyebrow}</p>
      )}
      <h2 className="font-headline-md text-headline-md text-secondary mb-4">{title}</h2>
      <div className={`h-px w-24 bg-secondary/30 mb-6 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>}
    </div>
  );
}
