// This is a backup of the working implementation
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { MainNavigation } from '@/components/MainNavigation';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, MapPin, Clock, Zap, ChevronRight } from 'lucide-react';
import { DanceStyle } from '@/data/types';
import { DanceStyleTag } from '@/data/danceStyles';
import { ContentSection, PioneersSection, FeaturedVideoSection, TechniquesSection } from '@/components/DanceStyleContent';
import { FeaturedVideo } from '@/components/FeaturedVideo';
import { getVideoById } from '@/data/entities';
import clsx from 'clsx';
import { useInViewport } from 'react-in-viewport';

interface StylePageClientProps {
  danceStyle: DanceStyle;
  relatedStyles: DanceStyle[];
  styleTags: DanceStyleTag[];
}

interface SectionConfig {
  id: string;
  labelKey: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
  component: React.ReactNode;
}

// Create a wrapper component for each section to handle viewport detection
interface ViewportSectionProps {
  section: SectionConfig;
  // Notify parent when section becomes visible (enter). Parent uses this to set activeSection.
  onEnter: (sectionId: string) => void;
}

const ViewportSection = ({ section, onEnter }: ViewportSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const tGlobal = useTranslations();
  const { inViewport, enterCount } = useInViewport(
    ref,
    {
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top, 60% from bottom
      threshold: 0.1
    }
  );

  useEffect(() => {
    // When the section becomes visible (enterCount increases), notify parent
    if (inViewport && enterCount > 0) {
      onEnter(section.id);
    }
  }, [inViewport, enterCount, section.id, onEnter]);

  const getAccentClasses = (color: 'primary' | 'secondary' | 'tertiary') => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-accent-primary/20 to-accent-primary/10 hover:from-accent-primary/30 hover:to-accent-primary/20'
        };
      case 'secondary':
        return {
          bg: 'from-accent-secondary/20 to-accent-secondary/10 hover:from-accent-secondary/30 hover:to-accent-secondary/20'
        };
      case 'tertiary':
        return {
          bg: 'from-accent-tertiary/20 to-accent-tertiary/10 hover:from-accent-tertiary/30 hover:to-accent-tertiary/20'
        };
    }
  };

  return (
    <section ref={ref} id={section.id} className="scroll-mt-24" aria-labelledby={`${section.id}-heading`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
  <div className="bg-surface-elevated/30 border border-stroke-secondary/40 rounded-lg p-3 md:p-4 shadow-sm hover:bg-surface-elevated/50 hover:border-stroke-secondary/60 hover:shadow-md transition-all duration-300">
          <header className="flex items-center space-x-3 mb-2 md:mb-3 pb-2 border-b border-stroke-secondary/20">
            <div className={clsx(
              "w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all duration-300",
              getAccentClasses(section.accentColor).bg
            )}>
              <span className="text-sm md:text-base" role="img" aria-hidden="true">{section.icon}</span>
            </div>
            <h2 id={`${section.id}-heading`} className="text-header-xs md:text-header-sm font-bold text-content-primary">
              {section.labelKey && section.labelKey.includes('.') ? tGlobal(section.labelKey) : section.labelKey}
            </h2>
          </header>
          <div className="md:ml-10">
            {section.component}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export function StylePageClient({ danceStyle, relatedStyles, styleTags }: StylePageClientProps) {
  const { applyTheme, clearTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [isTocOpen, setIsTocOpen] = useState(false);
  // We will rely on per-section `onEnter` callbacks from useInViewport
  const tNames = useTranslations('danceStyles.names');
  const tDescriptions = useTranslations('danceStyles.shortDescriptions');
  const tTags = useTranslations('danceTags');
  const tStyles = useTranslations();
  const tUi = useTranslations('ui');

  

  // Handle section enter events from ViewportSection
  const handleSectionEnter = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Helper function to check if content exists
  const hasContent = (): boolean => {
    // For now, we'll include all sections and let the components handle empty states
    return true;
  };

  // Define all possible sections with their components
  const allSections: SectionConfig[] = [
    {
      id: 'overview',
      labelKey: 'stylesPage.sections.overview',
      icon: '📖',
      accentColor: 'primary',
      component: <ContentSection danceStyle={danceStyle} sectionKey="overview" />
    },
    {
      id: 'history',
      labelKey: 'stylesPage.sections.history',
      icon: '⏰',
      accentColor: 'secondary',
      component: <ContentSection danceStyle={danceStyle} sectionKey="history" />
    },
    {
      id: 'pioneers',
      labelKey: 'stylesPage.sections.pioneers',
      icon: '⭐',
      accentColor: 'tertiary',
      component: <PioneersSection danceStyle={danceStyle} />
    },
    {
      id: 'culture',
      labelKey: 'stylesPage.sections.culture',
      icon: '🌍',
      accentColor: 'primary',
      component: <ContentSection danceStyle={danceStyle} sectionKey="culture" />
    },
    {
      id: 'featured-video',
      labelKey: 'stylesPage.sections.featuredVideo',
      icon: '🎬',
      accentColor: 'tertiary',
      component: <FeaturedVideoSection danceStyle={danceStyle} />
    },
    {
      id: 'techniques',
      labelKey: 'stylesPage.sections.techniques',
      icon: '⚡',
      accentColor: 'secondary',
      component: <TechniquesSection danceStyle={danceStyle} />
    }
  ];

  // Filter sections based on content availability
  const availableSections = allSections.filter(() => hasContent());

  // Always show related styles if available
  if (relatedStyles && relatedStyles.length > 0) {
    availableSections.push({
      id: 'related',
      labelKey: 'Related Styles',
      icon: '🤝',
      accentColor: 'secondary',
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
          {relatedStyles.map((relatedStyle) => (
            <div
              key={relatedStyle.slug}
              className="bg-surface-secondary/30 border border-stroke-secondary/30 rounded-xl p-2 md:p-3 hover:bg-surface-secondary/50 hover:border-stroke-secondary/50 transition-all duration-300 group"
            >
              <h3 className="text-body-sm md:text-body-md font-semibold text-content-primary mb-1">
                {relatedStyle.name}
              </h3>
              <p className="text-body-xs text-content-tertiary">
                {relatedStyle.shortDescription}
              </p>
            </div>
          ))}
        </div>
      )
    });
  }

  // Keep last-section highlighting when user scrolls to bottom
  useEffect(() => {
    const onScroll = () => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);
      if (isAtBottom && availableSections.length > 0) {
        const lastSection = availableSections[availableSections.length - 1];
        setActiveSection(lastSection.id);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [availableSections]);

  useEffect(() => {
    if (danceStyle) {
      applyTheme(danceStyle.theme);
      return () => clearTheme();
    }
  }, [danceStyle, applyTheme, clearTheme]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsTocOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary text-content-primary">
      <MainNavigation />
      
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary border-b border-stroke-primary">
        {/* Dynamic Theme Background with Spotlight Effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${danceStyle.theme?.primary || '#f97316'}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${danceStyle.theme?.secondary || '#ec4899'}30 0%, transparent 50%), radial-gradient(circle at 40% 40%, ${danceStyle.theme?.primary || '#f97316'}20 0%, transparent 70%)`
          }}
        >
          {/* Animated spotlight effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 30% 20%, ${danceStyle.theme?.primary || '#f97316'}40 0%, transparent 50%)`,
                `radial-gradient(circle at 70% 30%, ${danceStyle.theme?.primary || '#f97316'}40 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 60%, ${danceStyle.theme?.primary || '#f97316'}40 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 20%, ${danceStyle.theme?.primary || '#f97316'}40 0%, transparent 50%)`
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-content-tertiary text-body-sm mb-6">
              <Link href="/styles" className="hover:text-accent-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <span>/</span>
              <Link href="/styles" className="hover:text-accent-primary transition-colors">
                {tUi('breadcrumbs.styles')}
              </Link>
              <span>/</span>
              <span className="text-content-secondary">{tNames(danceStyle.id)}</span>
            </div>

            {/* Hero Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Title & Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-header-xl md:text-header-2xl font-black text-content-primary mb-4 leading-tight">
                    {tNames(danceStyle.id)}
                  </h1>
                  <p className="text-body-md md:text-body-lg text-content-secondary leading-relaxed mb-6">
                    {tDescriptions(danceStyle.id)}
                  </p>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-body-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-accent-primary" />
                    <span>{tStyles(danceStyle.locationKey)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-accent-secondary" />
                    <span>{tStyles(danceStyle.eraKey)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-accent-tertiary" />
                    <span>{tUi('tags.streetDance')}</span>
                  </div>
                </div>

                {/* Tags */}
                {styleTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {styleTags.map((tag) => (
                      <Badge 
                        key={tag.id}
                        variant="secondary"
                        className={clsx(
                          "flex items-center gap-1.5 px-2.5 py-1 text-body-xs",
                          tag.color === 'primary' && "bg-accent-primary/10 text-accent-primary border-accent-primary/20",
                          tag.color === 'secondary' && "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20",
                          tag.color === 'tertiary' && "bg-accent-tertiary/10 text-accent-tertiary border-accent-tertiary/20"
                        )}
                      >
                        <span className="text-xs">{tag.icon}</span>
                        {tTags(`${tag.id}.name`)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Media in Hero */}
              <div className="lg:block">
                <FeaturedVideo video={danceStyle.featuredVideoId ? getVideoById(danceStyle.featuredVideoId) : undefined} />
              </div>
            </div>

            {/* Mobile TOC Toggle */}
            <div className="lg:hidden mt-8">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-elevated border border-stroke-secondary rounded-xl text-content-primary hover:border-accent-primary/50 transition-colors"
              >
                <span className="font-medium">{tUi('tableOfContents')}</span>
                <ChevronRight className={clsx("h-4 w-4 transition-transform", isTocOpen && "rotate-90")} />
              </button>
              
              {isTocOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-surface-elevated border border-stroke-secondary rounded-xl p-4"
                >
                  <nav className="space-y-2">
                    {availableSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={clsx(
                          "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-start transition-colors text-body-sm",
                          activeSection === section.id
                            ? "bg-accent-primary/20 text-accent-primary"
                            : "text-content-secondary hover:text-accent-primary hover:bg-accent-primary/10"
                        )}
                      >
                        <span className="text-sm">{section.icon}</span>
                        <span>{section.labelKey && section.labelKey.includes('.') ? tStyles(section.labelKey) : section.labelKey}</span>
                      </button>
                    ))}
                  </nav>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${tNames(danceStyle.id)} - Street Dance Style Guide`,
            "description": tDescriptions(danceStyle.id),
            "image": `/images/styles/${danceStyle.slug}-hero.jpg`,
            "author": {
              "@type": "Organization",
              "name": "Dance Street Styles",
              "url": "https://dancestreetstyles.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dance Street Styles",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dancestreetstyles.com/logo.png"
              }
            },
            "datePublished": "2024-01-01T00:00:00.000Z",
            "dateModified": "2024-01-01T00:00:00.000Z",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://dancestreetstyles.com/styles/${danceStyle.slug}`
            },
            "about": {
              "@type": "Thing",
              "name": tNames(danceStyle.id),
              "description": tDescriptions(danceStyle.id)
            },
            "keywords": [
              tNames(danceStyle.id),
              "street dance",
              "hip hop culture",
              "dance style",
              tStyles(danceStyle.locationKey),
              tStyles(danceStyle.eraKey)
            ].join(", ")
          })
        }}
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar TOC */}
          <aside className="hidden lg:block" role="navigation" aria-label="Table of contents">
            <div className="sticky top-24">
              <div className="bg-gradient-to-b from-surface-elevated/80 to-surface-elevated/40 backdrop-blur-sm border border-stroke-secondary/30 rounded-lg p-6">
                <h3 className="text-header-xs font-bold text-content-primary mb-4">
                  {tUi('tableOfContents')}
                </h3>
                <nav className="space-y-1">
                  {availableSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={clsx(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-start transition-all duration-200 text-body-sm",
                        activeSection === section.id
                          ? "bg-accent-primary/20 text-accent-primary shadow-sm"
                          : "text-content-secondary hover:text-accent-primary hover:bg-accent-primary/10"
                      )}
                      aria-current={activeSection === section.id ? "page" : undefined}
                    >
                      <span className="text-sm" aria-hidden="true">{section.icon}</span>
                      <span>{section.labelKey && section.labelKey.includes('.') ? tStyles(section.labelKey) : section.labelKey}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3" role="main">
            <article className="space-y-4 md:space-y-6">
              {availableSections.map((section) => (
                  <ViewportSection 
                    key={section.id}
                    section={section}
                    onEnter={handleSectionEnter}
                  />
                ))}
          
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};
