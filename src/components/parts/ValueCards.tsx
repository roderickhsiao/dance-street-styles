'use client';

import { motion } from '@/lib/motion';

interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

interface ValueCardsProps {
  values: ValueCard[];
  title?: string;
  className?: string;
}

export const ValueCards = ({ values, title, className = '' }: ValueCardsProps) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-content-primary magazine-headline">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface-secondary/30 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-stroke-secondary hover:border-accent-primary/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-header-sm font-black mb-4 text-content-primary magazine-headline">
                {value.title}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed magazine-body">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
