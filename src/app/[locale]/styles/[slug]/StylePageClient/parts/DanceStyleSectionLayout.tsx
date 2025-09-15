import React from 'react';

interface DanceStyleSectionLayoutProps {
  id: string;
  title: string;
  emoji: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export const DanceStyleSectionLayout = ({
  id,
  title,
  emoji,
  accentColor,
  children,
}: DanceStyleSectionLayoutProps) =>
  children ? (
    <section id={id} className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <div className="bg-surface-elevated/30 border border-stroke-secondary/40 rounded-lg p-3 md:p-4 shadow-sm hover:bg-surface-elevated/50 hover:border-stroke-secondary/60 hover:shadow-md transition-all duration-300">
        <header className="flex items-center space-x-3 mb-2 md:mb-3 pb-2 border-b border-stroke-secondary/20">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all duration-300 from-accent-${accentColor}/20 to-accent-${accentColor}/10 hover:from-accent-${accentColor}/30 hover:to-accent-${accentColor}/20`}
          >
            <span
              className="text-sm md:text-base"
              role="img"
              aria-hidden="true"
            >
              {emoji}
            </span>
          </div>
          <h2
            id={`${id}-heading`}
            className="text-header-xs md:text-header-sm font-bold text-content-primary"
          >
            {title}
          </h2>
        </header>
        <div className="md:ms-10">{children}</div>
      </div>
    </section>
  ) : null;
