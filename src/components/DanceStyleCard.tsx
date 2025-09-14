"use client";

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DanceStyleCardProps {
  title: string;
  description: string;
  origin: string;
  year: string;
  characteristics: string[];
  themeColor?: string;
  onClick?: () => void;
  className?: string;
}

export const DanceStyleCard = ({
  title,
  description,
  origin,
  year,
  characteristics,
  themeColor = '#3498DB',
  onClick,
  className
}: DanceStyleCardProps) => {
  // Convert hex color to RGB for better transparency
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 52, g: 152, b: 219 };
  };

  const rgb = hexToRgb(themeColor);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("cursor-pointer h-full", className)}
      onClick={onClick}
    >
      <div 
        className="h-full overflow-hidden rounded-xl group hover:shadow-2xl transition-all duration-300 relative"
        style={{
          backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
          boxShadow: `
            0 8px 32px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)
          `
        }}
      >
        {/* Top highlight */}
        <div 
          className="absolute top-0 start-0 end-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4) 50%, transparent 100%)`
          }}
        />
        
        {/* Theme accent bar */}
        <div 
          className="h-1 w-full"
          style={{ 
            background: `linear-gradient(90deg, ${themeColor}, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6))`
          }}
        />
        
        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-header-xs font-bold text-content-primary group-hover:text-opacity-90 transition-colors mb-2">
              {title}
            </h3>
            <p className="text-body-sm text-content-secondary mb-4">
              {origin} • {year}
            </p>
          </div>
          
          <p className="text-body-sm leading-relaxed text-content-secondary line-clamp-3">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {characteristics.slice(0, 3).map((characteristic, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-body-xs text-content-primary border-0"
                style={{ 
                  backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                {characteristic}
              </Badge>
            ))}
            {characteristics.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-body-xs text-content-tertiary border-stroke-secondary"
              >
                +{characteristics.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
