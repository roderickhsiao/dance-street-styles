// Content Components for DRY page layouts
export { SectionHeader } from './SectionHeader';
export { ContentArray } from './ContentArray'; 
export { FeatureCardGrid } from './FeatureCardGrid';
export { CTASection } from './CTASection';
export { PageSection } from './PageSection';

// Re-export commonly used types
export interface FeatureCardData {
  emoji: string;
  title: string;
  description: string;
}