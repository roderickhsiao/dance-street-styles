'use client';

import { ReactNode } from 'react';
import { FadeInUpSection } from '@/components/animations/AnimatedSections';

interface SectionLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  centered?: boolean;
  animate?: boolean;
}

export const SectionLayout = ({
  title,
  description,
  children,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  contentClassName = '',
  centered = true,
  animate = true
}: SectionLayoutProps) => {
  const Wrapper = animate ? FadeInUpSection : 'div';
  const wrapperProps = animate ? {} : { className: '' };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(title || description) && (
          <Wrapper 
            {...wrapperProps}
            className={`mb-12 ${centered ? 'text-center' : ''}`}
          >
            {title && (
              <h2 className={`text-header-lg font-black text-content-primary mb-4 magazine-headline ${titleClassName}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-content-secondary text-body-lg max-w-4xl ${centered ? 'mx-auto' : ''} magazine-body ${descriptionClassName}`}>
                {description}
              </p>
            )}
          </Wrapper>
        )}
        
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </section>
  );
};