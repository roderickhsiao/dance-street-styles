'use client';


import { motion } from '@/lib/motion';
import clsx from 'clsx';

interface QuoteProps {
  quote: string;
  author: string;
  authorTitle?: string;
  className?: string;
  variant?: 'default' | 'featured' | 'inline';
}

export const Quote = ({ 
  quote, 
  author, 
  authorTitle, 
  className = '', 
  variant = 'default' 
}: QuoteProps) => {
  if (variant === 'inline') {
    return (
      <span className={clsx(className)}>
        <q className="text-content-primary magazine-body italic font-semibold">
          {quote}
        </q>
        {author && (
          <cite className="text-content-secondary text-body-sm magazine-sans font-bold ms-2 not-italic">
            — {author}
            {authorTitle && <span className="text-content-tertiary font-medium">, {authorTitle}</span>}
          </cite>
        )}
      </span>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.figure 
        className={clsx('relative', className)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Bold background with immersive styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/15 to-accent-tertiary/20 rounded-3xl blur-xl"></div>
        <blockquote className="relative bg-gradient-to-br from-surface-elevated/90 to-surface-secondary/90 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl border-2 border-accent-primary/30 shadow-2xl overflow-hidden">
          {/* Decorative quote marks */}
          <div className="absolute top-4 start-6 text-6xl text-accent-primary/20 font-black magazine-headline leading-none">&ldquo;</div>
          <div className="absolute bottom-4 end-6 text-6xl text-accent-primary/20 font-black magazine-headline leading-none rotate-180">&rdquo;</div>
          
          <div className="relative z-10 text-center">
            <motion.p 
              className="text-header-lg font-black mb-8 text-content-primary magazine-headline leading-tight tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <q className="italic">{quote}</q>
            </motion.p>
            <motion.figcaption 
              className="text-content-secondary text-body-lg magazine-sans font-bold border-t-2 border-accent-primary/30 pt-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-primary font-black text-body-xl">— {author}</span>
              {authorTitle && <span className="text-content-tertiary block mt-2 font-semibold text-body-md">{authorTitle}</span>}
            </motion.figcaption>
          </div>
        </blockquote>
      </motion.figure>
    );
  }

  // Default variant - more bold and immersive
  return (
    <motion.figure 
      className={clsx(className)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <blockquote className="relative border-s-8 border-accent-primary bg-gradient-to-r from-accent-primary/5 via-transparent to-transparent ps-4 sm:ps-6 md:ps-8 py-4 sm:py-6 rounded-e-2xl shadow-lg">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent rounded-e-2xl blur-sm"></div>
        
        <div className="relative z-10">
          <p className="text-content-primary text-header-sm font-bold magazine-body leading-relaxed mb-4">
            <q className="italic font-black">{quote}</q>
          </p>
          <figcaption className="text-content-secondary text-body-md magazine-sans font-bold">
            <span className="text-accent-primary">— {author}</span>
            {authorTitle && <span className="text-content-tertiary font-semibold">, {authorTitle}</span>}
          </figcaption>
        </div>
      </blockquote>
    </motion.figure>
  );
};
