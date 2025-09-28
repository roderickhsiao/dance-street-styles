'use client';

import { ReactNode } from 'react';
import { Section } from '@/components/Section';
import { SectionHeader } from './SectionHeader';
import { ContentArray } from './ContentArray';

interface PageSectionProps {
  title: string;
  description?: string;
  content?: string[] | ReactNode;
  background?: 'primary' | 'secondary' | 'elevated' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'full' | 'max-7xl' | 'max-6xl' | 'max-5xl' | 'max-4xl';
  centered?: boolean;
  animate?: boolean;
  children?: ReactNode;
  className?: string;
}

export const PageSection = ({
  title,
  description,
  content,
  background = 'primary',
  padding = 'xl',
  containerWidth = 'max-4xl',
  centered = true,
  animate = true,
  children,
  className = ''
}: PageSectionProps) => {
  const containerClasses = {
    'full': 'w-full',
    'max-7xl': 'max-w-7xl mx-auto',
    'max-6xl': 'max-w-6xl mx-auto',
    'max-5xl': 'max-w-5xl mx-auto',
    'max-4xl': 'max-w-4xl mx-auto'
  };

  return (
    <Section background={background} padding={padding} animate={animate} className={className}>
      <div className={containerClasses[containerWidth]}>
        <SectionHeader 
          title={title}
          description={description}
          centered={centered}
          animate={animate}
        />
        
        {content && Array.isArray(content) && (
          <ContentArray 
            content={content} 
            className={centered ? 'text-center' : ''} 
          />
        )}
        
        {content && !Array.isArray(content) && content}
        
        {children}
      </div>
    </Section>
  );
};