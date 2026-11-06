import type { ReactNode } from 'react';

export function EditorialHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  size = 'compact',
  className = '',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  size?: 'compact' | 'large';
  className?: string;
}) {
  return (
    <section className={`editorial-hero editorial-hero--${size} ${className}`}>
      <img className="editorial-hero__image" src={image} alt={imageAlt} fetchPriority={size === 'large' ? 'high' : 'auto'} />
      <div className="editorial-hero__wash" aria-hidden="true" />
      <div className="editorial-hero__content">
        <p className="editorial-hero__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="editorial-hero__description">{description}</p>}
        {children && <div className="editorial-hero__actions">{children}</div>}
      </div>
    </section>
  );
}
