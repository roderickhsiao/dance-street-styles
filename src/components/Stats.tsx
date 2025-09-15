"use client";

import { useTranslations } from 'next-intl';
import { motion } from '@/lib/motion';

interface StatItem {
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent-primary' | 'accent-secondary' | 'accent-tertiary';
}

interface StatsProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Stats = ({ stats, columns = 4, className = "" }: StatsProps) => {
  const colorClasses = {
    primary: 'text-content-primary',
    secondary: 'text-content-secondary', 
    tertiary: 'text-content-tertiary',
    'accent-primary': 'text-accent-primary',
    'accent-secondary': 'text-accent-secondary',
    'accent-tertiary': 'text-accent-tertiary'
  };

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3', 
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6 text-center ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 magazine-headline ${colorClasses[stat.color || 'accent-primary']} ${stat.value === '∞' ? 'infinity-symbol' : ''}`}>
            {stat.value}
          </div>
          <div className="text-body-sm md:text-body-md text-content-tertiary magazine-sans uppercase tracking-wider font-bold">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
