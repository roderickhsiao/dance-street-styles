'use client';

import { ReactNode } from 'react';
import { motion } from '@/lib/motion';
import clsx from 'clsx';
import Image from 'next/image';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export const BaseCard = ({
  children,
  className = '',
  hover = true,
  bordered = true,
  clickable = false,
  onClick,
  animate = false,
  delay = 0
}: BaseCardProps) => {
  const cardClasses = clsx(
    'bg-surface-elevated rounded-lg p-4',
    {
      'border border-stroke-secondary': bordered,
      'hover:border-accent-primary/50 transition-colors duration-300': hover,
      'cursor-pointer': clickable,
      'hover:bg-surface-secondary/50': hover && clickable,
    },
    className
  );

  const content = (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

interface ResourceCardProps extends BaseCardProps {
  title: string;
  description: string;
  image?: string;
  author?: string;
  platform?: string;
  year?: string;
  type?: 'video' | 'article' | 'website' | 'book';
  url?: string;
}

export const ResourceCard = ({
  title,
  description,
  image,
  author,
  platform,
  year,
  url,
  ...baseProps
}: ResourceCardProps) => {
  return (
    <BaseCard 
      {...baseProps}
      clickable={!!url}
      onClick={() => url && window.open(url, '_blank')}
    >
      <div className="space-y-3">
        {image && (
          <div className="aspect-video bg-surface-primary rounded overflow-hidden">
            <Image 
              src={image} 
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="font-bold text-content-primary line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-content-secondary line-clamp-3">
            {description}
          </p>
          
          {(author || platform || year) && (
            <div className="flex items-center gap-2 text-xs text-content-tertiary">
              {author && <span>{author}</span>}
              {author && platform && <span>•</span>}
              {platform && <span>{platform}</span>}
              {(author || platform) && year && <span>•</span>}
              {year && <span>{year}</span>}
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};