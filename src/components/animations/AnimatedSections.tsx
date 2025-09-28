'use client';

import { motion } from '@/lib/motion';
import { ReactNode } from 'react';

// Common animation wrapper components to reduce repetition

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUpSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeInSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInLeftSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInRightSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleInSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Grid animation with staggered children
interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredGrid = ({ children, className = '', staggerDelay = 0.1 }: StaggeredGridProps) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={{
      initial: {},
      animate: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggeredGridItem = ({ children, className = '', index = 0 }: AnimatedSectionProps & { index?: number }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 30 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, delay: index * 0.1 }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);