'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface FiveElementCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  why: string;
  pioneers: string;
  bgColor: string;
  hoverColor: string;
  borderColor: string;
}

export const FiveElementCard = ({
  icon,
  title,
  subtitle,
  description,
  why,
  pioneers,
  bgColor,
  hoverColor,
  borderColor
}: FiveElementCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('streetCulture.elements.sections');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${bgColor} ${hoverColor} ${borderColor} backdrop-blur-sm p-6 rounded-2xl border transition-all duration-300 cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{icon}</div>
          <div>
            <h4 className="text-header-sm font-black text-content-primary magazine-headline">
              {title}
            </h4>
            <p className="text-body-sm text-content-secondary magazine-sans">
              {subtitle}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-content-tertiary"
        >
          ▼
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-stroke-secondary">
              <div className="space-y-4">
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('description')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {description}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('whyItMatters')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {why}
                  </p>
                </div>
                
                <div>
                  <h5 className="text-body-sm font-bold text-content-primary mb-2 magazine-headline">
                    {t('pioneers')}
                  </h5>
                  <p className="text-body-sm text-content-secondary magazine-sans leading-normal font-medium">
                    {pioneers}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
