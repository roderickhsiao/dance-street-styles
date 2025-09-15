"use client";

import { motion } from '@/lib/motion';

interface CardItem {
  icon?: string;
  title: string;
  description: string;
  href?: string;
  accent?: 'primary' | 'secondary' | 'tertiary';
}

interface CardGridProps {
  title?: string;
  items: CardItem[];
  columns?: 'auto' | 2 | 3 | 4;
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
}

interface CardProps {
  item: CardItem;
  index: number;
  variant: 'default' | 'glass' | 'elevated';
}

const Card = ({ item, index, variant }: CardProps) => {
  const variantClasses = {
    default: 'bg-surface-primary/80 backdrop-blur-sm border border-stroke-primary',
    glass: 'bg-surface-primary/50 backdrop-blur-md border border-white/10',
    elevated: 'bg-surface-secondary border border-stroke-primary shadow-xl'
  };

  const accentClasses = {
    primary: 'hover:border-accent-primary/50',
    secondary: 'hover:border-accent-secondary/50', 
    tertiary: 'hover:border-accent-tertiary/50'
  };

  const CardContent = (
    <motion.div
      className={`
        ${variantClasses[variant]}
        ${accentClasses[item.accent || 'primary']}
        p-6 sm:p-8 rounded-2xl transition-all duration-300 group h-full
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {item.icon && (
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
      )}
      
      <h3 className="font-bold text-xl mb-4 text-content-primary magazine-headline">
        {item.title}
      </h3>
      
      <p className="text-content-secondary leading-relaxed magazine-body">
        {item.description}
      </p>
    </motion.div>
  );

  return item.href ? (
    <a href={item.href} className="block h-full">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
};

export const CardGrid = ({ 
  title, 
  items, 
  columns = 'auto', 
  variant = 'default',
  className = ""
}: CardGridProps) => {
  const columnClasses = {
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className={`md:py-20 md:px-6 bg-surface-secondary ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.h2 
            className="text-header-lg font-black mb-16 text-center text-content-primary magazine-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        )}
        
        <div className={`grid ${columnClasses[columns]} gap-8`}>
          {items.map((item, index) => (
            <Card
              key={index}
              item={item}
              index={index}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
