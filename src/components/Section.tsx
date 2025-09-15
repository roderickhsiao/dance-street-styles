"use client";

import { motion } from '@/lib/motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'primary' | 'secondary' | 'elevated' | 'none';
  containerWidth?: 'full' | 'max-7xl' | 'max-6xl' | 'max-5xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export const Section = ({ 
  children, 
  className = "", 
  background = 'none',
  containerWidth = 'max-7xl',
  padding = 'lg',
  animate = true
}: SectionProps) => {
  const backgroundClasses = {
    primary: 'bg-surface-primary',
    secondary: 'bg-surface-secondary', 
    elevated: 'bg-surface-elevated',
    none: ''
  };

  const containerClasses = {
    full: 'w-full',
    'max-7xl': 'max-w-7xl mx-auto',
    'max-6xl': 'max-w-6xl mx-auto',
    'max-5xl': 'max-w-5xl mx-auto'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-10 px-4 sm:px-6',
    md: 'py-16 px-4 sm:px-6',
    lg: 'py-20 px-4 sm:px-6',
    xl: 'py-32 px-4 sm:px-8'
  };

  const content = (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className={containerClasses[containerWidth]}>
        {children}
      </div>
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
