import { motion } from 'framer-motion';
import clsx from 'clsx';

interface DanceStyleSectionProps {
  id: string;
  title: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  className?: string;
}

export function DanceStyleSection({ 
  id, 
  title, 
  icon, 
  accentColor, 
  children, 
  className = "" 
}: DanceStyleSectionProps) {
  const getAccentClasses = (color: 'primary' | 'secondary' | 'tertiary') => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-accent-primary/20 to-accent-primary/10 hover:from-accent-primary/30 hover:to-accent-primary/20',
          text: 'text-accent-primary'
        };
      case 'secondary':
        return {
          bg: 'from-accent-secondary/20 to-accent-secondary/10 hover:from-accent-secondary/30 hover:to-accent-secondary/20',
          text: 'text-accent-secondary'
        };
      case 'tertiary':
        return {
          bg: 'from-accent-tertiary/20 to-accent-tertiary/10 hover:from-accent-tertiary/30 hover:to-accent-tertiary/20',
          text: 'text-accent-tertiary'
        };
    }
  };

  const accentClasses = getAccentClasses(accentColor);

  return (
    <section id={id} className={clsx("scroll-mt-24", className)} aria-labelledby={`${id}-heading`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-surface-elevated/30 border border-stroke-secondary/40 rounded-2xl p-3 md:p-4 shadow-sm hover:bg-surface-elevated/50 hover:border-stroke-secondary/60 hover:shadow-md transition-all duration-300">
          <header className="flex items-center space-x-3 mb-2 md:mb-3 pb-2 border-b border-stroke-secondary/20">
            <div className={clsx(
              "w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all duration-300",
              accentClasses.bg
            )}>
              <span className="text-sm md:text-base" role="img" aria-hidden="true">{icon}</span>
            </div>
            <h2 id={`${id}-heading`} className="text-header-xs md:text-header-sm font-bold text-content-primary">
              {title}
            </h2>
          </header>
          <div className="md:ml-10">
            {children}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
