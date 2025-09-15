'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface DanceStyleGridCardProps {
  name: string;
  description: string;
  era: string;
  location: string;
  tags: string[];
  slug: string;
  index: number;
}

export function DanceStyleGridCard({
  name,
  description,
  era,
  location,
  tags,
  slug,
  index,
}: DanceStyleGridCardProps) {
  const t = useTranslations();
  // The page passes raw era/location for compatibility; prefer translation keys
  // If the caller instead passes translation keys, they should already be translated
  const tTags = useTranslations('danceTags');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05 
      }}
      viewport={{ once: true }}
      className="relative h-full"
    >
      <Link href={`/styles/${slug}`}>
        <div className="group relative bg-surface-secondary/50 backdrop-blur-sm p-6 rounded-2xl border border-stroke-primary hover:border-accent-primary/50 transition-all duration-300 h-full flex flex-col">
          
          {/* Title at the top */}
          <h3 className="text-header-sm font-black text-content-primary group-hover:text-accent-primary transition-colors mb-4">
            {name}
          </h3>
          
          {/* Style Tags - better positioned */}
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="bg-surface-elevated/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-content-secondary border border-stroke-primary/30"
              >
                {tTags(`${tag}.name`)}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-body-sm text-content-secondary line-clamp-3 mb-4 flex-grow">
            {description}
          </p>
          
          {/* Era and Location inside card */}
          <div className="mt-auto space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full text-xs font-medium">
                📅 {era}
              </span>
              <span className="inline-flex items-center gap-1 bg-accent-secondary/10 text-accent-secondary px-3 py-1 rounded-full text-xs font-medium">
                📍 {location}
              </span>
            </div>
            
            <div className="flex items-center justify-start pt-2">
              <span className="text-body-sm font-medium text-accent-primary group-hover:text-accent-secondary transition-colors">
                {t('stylesPage.styleCard.exploreStyle')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
