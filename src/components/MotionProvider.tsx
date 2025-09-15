'use client';

import { ReactNode } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';

/**
 * Motion Provider that wraps the app with LazyMotion for bundle size reduction
 * This ensures only the DOM animation features are loaded, reducing the bundle size
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};
