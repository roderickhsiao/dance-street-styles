'use client';

import { useTranslations } from 'next-intl';
import { PageSection } from '@/components/content/PageSection';
import { aboutPageData } from '@/data/pageData';

interface DataDrivenPageProps {
  pageType: 'about' | 'origins' | 'contact';
}

export const DataDrivenPage = ({ pageType }: DataDrivenPageProps) => {
  const t = useTranslations(pageType);
  
  // Data-driven approach - zero hardcoded JSX structure
  const renderPageContent = () => {
    switch (pageType) {
      case 'about':
        return aboutPageData.sections.map((section) => (
          <PageSection
            key={section.id}
            title={t(section.titleKey)}
            content={t.raw(section.contentKey)}
            background={section.background}
          />
        ));
        
      default:
        return null;
    }
  };
  
  return <>{renderPageContent()}</>;
};