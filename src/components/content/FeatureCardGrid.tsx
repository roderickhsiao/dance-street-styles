'use client';

import { motion } from '@/lib/motion';

interface FeatureCardData {
  emoji: string;
  title: string;
  description: string;
}

interface FeatureCardGridProps {
  items: FeatureCardData[];
  columns?: 2 | 3 | 4;
  className?: string;
  animate?: boolean;
}

export const FeatureCardGrid = ({
  items,
  columns = 3,
  className = '',
  animate = true
}: FeatureCardGridProps) => {
  const gridClasses = {
    2: 'grid md:grid-cols-2 gap-8',
    3: 'grid md:grid-cols-3 gap-8', 
    4: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-8'
  };

  return (
    <div className={`${gridClasses[columns]} ${className}`}>
      {items.map((item, index) => {
        const content = (
          <div className="bg-surface-secondary/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-stroke-secondary text-center hover:border-accent-primary/50 transition-all duration-300">
            <div className="text-4xl mb-4">{item.emoji}</div>
            <h3 className="text-header-sm font-black mb-4 text-content-primary magazine-headline">
              {item.title}
            </h3>
            <p className="text-content-secondary text-body-sm leading-relaxed magazine-body">
              {item.description}
            </p>
          </div>
        );

        if (animate) {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {content}
            </motion.div>
          );
        }

        return <div key={index}>{content}</div>;
      })}
    </div>
  );
};