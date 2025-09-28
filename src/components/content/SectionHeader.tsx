'use client';

import { FadeInUpSection } from '@/components/animations/AnimatedSections';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
  animate?: boolean;
}

export const SectionHeader = ({
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  centered = true,
  animate = true
}: SectionHeaderProps) => {
  const Wrapper = animate ? FadeInUpSection : 'div';
  const wrapperProps = animate ? {} : { className: '' };

  return (
    <Wrapper 
      {...wrapperProps}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className={`text-header-lg font-black text-content-primary mb-4 magazine-headline ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-content-secondary text-body-lg max-w-4xl ${centered ? 'mx-auto' : ''} magazine-body ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </Wrapper>
  );
};