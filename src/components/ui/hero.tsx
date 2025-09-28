"use client";

import { motion } from '@/lib/motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface HeroProps {
  title: React.ReactNode;
  titleLines?: {
    line1?: string;
    line2?: string;
    line3?: string;
  };
  subtitle?: string;
  masthead?: string;
  badges?: string[];
  children?: ReactNode;
  backgroundVariant?: 'gradient' | 'street' | 'culture' | 'magazine';
  className?: string;
  contentAlignment?: 'center' | 'left';
  layout?: 'standard' | 'magazine';
}

interface DecorativeElementProps {
  className: string;
  type?: 'circle' | 'square';
  animate?: boolean;
}

const DecorativeElement = ({ className, type = 'circle', animate = false }: DecorativeElementProps) => {
  return (
    <div 
      className={clsx(
        'absolute opacity-30',
        animate && 'animate-pulse',
        type === 'circle' ? 'rounded-full' : 'rotate-45',
        className
      )} 
    />
  );
};

export const Hero = ({ 
  title, 
  titleLines,
  subtitle, 
  masthead, 
  badges,
  children, 
  backgroundVariant = 'gradient',
  className = "",
  contentAlignment = 'center',
  layout = 'standard'
}: HeroProps) => {
  const backgroundClasses = {
    gradient: 'bg-black',
    street: 'bg-gradient-to-br from-surface-secondary via-surface-elevated to-gray-700',
    culture: 'bg-gradient-to-br from-purple-800 via-pink-700 to-orange-500',
    magazine: 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
  };

  const alignmentClasses = contentAlignment === 'center' ? 'text-center' : 'text-center md:text-start';
  const contentMaxWidth = contentAlignment === 'center' ? 'max-w-6xl mx-auto' : 'max-w-7xl mx-auto';

  // Magazine layout uses a different structure
  if (layout === 'magazine') {
    return (
      <section className={clsx(
        'relative overflow-hidden min-h-screen flex items-center justify-center',
        backgroundClasses[backgroundVariant],
        className
      )}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/10 last:border-r-0"></div>
            ))}
          </div>
        </div>
        
        {/* Magazine-style decorative elements */}
        <DecorativeElement 
          className="top-32 end-20 w-40 h-40 border-2 border-accent-primary/20 rotate-12"
          animate 
        />
        <DecorativeElement 
          className="bottom-40 start-20 w-32 h-32 bg-accent-secondary/10 -rotate-12" 
        />
        <DecorativeElement 
          className="top-20 start-1/2 w-20 h-20 border border-accent-tertiary/30 rotate-45"
          type="square"
        />
        
        <div className="relative z-10 px-6 py-32 w-full max-w-7xl mx-auto">
          <div className="text-center md:text-start">
            {masthead && (
              <motion.div 
                className="text-accent-primary font-bold text-body-md md:text-body-lg mb-8 tracking-[0.3em] uppercase magazine-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {masthead}
              </motion.div>
            )}
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-none magazine-headline"
            >
              {titleLines ? (
                <>
                  {titleLines.line1 && (
                    <motion.span 
                      className="block text-white mb-2"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                      {titleLines.line1}
                    </motion.span>
                  )}
                  {titleLines.line2 && (
                    <motion.span 
                      className="block text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text mb-2"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                      {titleLines.line2}
                    </motion.span>
                  )}
                  {titleLines.line3 && (
                    <motion.span 
                      className="block text-transparent bg-gradient-to-r from-accent-secondary to-accent-tertiary bg-clip-text"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    >
                      {titleLines.line3}
                    </motion.span>
                  )}
                </>
              ) : (
                <motion.span 
                  className="text-white"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {title}
                </motion.span>
              )}
            </motion.h1>
            
            {subtitle && (
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-5xl leading-relaxed mb-12 magazine-body font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            {children && (
              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={clsx(
      'relative overflow-hidden min-h-[80vh] flex items-center',
      backgroundClasses[backgroundVariant],
      className
    )}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative elements */}
      <DecorativeElement 
        className="top-20 end-10 w-32 h-32 border border-accent-primary/20"
        animate 
      />
      <DecorativeElement 
        className="bottom-32 start-16 w-24 h-24 bg-accent-secondary/10" 
      />
      <DecorativeElement 
        className="top-1/3 start-8 w-16 h-16 border border-accent-tertiary/30"
        type="square"
      />
      
      <div className={clsx('relative z-10 px-6 py-20 w-full', contentMaxWidth)}>
        <div className={alignmentClasses}>
          {masthead && (
            <motion.div 
              className="text-accent-primary font-bold text-body-sm md:text-body-md mb-4 tracking-[0.2em] uppercase magazine-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {masthead}
            </motion.div>
          )}
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight magazine-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 magazine-body"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {badges && badges.length > 0 && (
            <motion.div 
              className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 magazine-sans mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-gray-600"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          )}
          
          {children && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
