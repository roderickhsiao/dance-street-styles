"use client";

import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverBorderColor: string;
  delay?: number;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  borderColor,
  hoverBorderColor,
  delay = 0,
  className = ""
}: FeatureCardProps) => {
  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} border ${borderColor} p-6 sm:p-8 ${hoverBorderColor} transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-3 magazine-headline">
        {title}
      </h3>
      <p className="text-content-secondary leading-relaxed magazine-body">
        {description}
      </p>
    </motion.div>
  );
};
