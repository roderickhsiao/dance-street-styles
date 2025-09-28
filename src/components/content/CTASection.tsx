'use client';

import { motion } from '@/lib/motion';
import { CTAButton } from '@/components/ui/cta-button';

interface CTASectionProps {
  buttonText: string;
  href: string;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  showArrow?: boolean;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const CTASection = ({
  buttonText,
  href,
  variant = 'outline',
  size = 'default',
  showArrow = true,
  className = '',
  animate = true,
  delay = 1.4
}: CTASectionProps) => {
  const content = (
    <div className="inline-block">
      <CTAButton 
        href={href} 
        variant={variant} 
        size={size}
        showArrow={showArrow}
      >
        {buttonText}
      </CTAButton>
    </div>
  );

  if (animate) {
    return (
      <div className={`text-center ${className}`}>
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay }}
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      {content}
    </div>
  );
};