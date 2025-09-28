'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from '@/lib/motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, MapPin, Clock, Zap, ChevronRight } from 'lucide-react';
import { DanceStyle } from '@/data/types';
import { DanceStyleTag, getFeaturedVideoForStyle } from '@/data/danceStyles';
import { DanceStyleSectionLayout, ResourcesSection, LandmarksSection } from '@/app/[locale]/styles/[slug]/StylePageClient/parts';
import { FeaturedVideo } from '@/components/FeaturedVideo';
import { KeyFigures } from '@/components/KeyFigures';
import { getLandmarkById } from '@/data/entities/landmarks';
import clsx from 'clsx';
import { useInViewport } from 'react-in-viewport';

// Type for pioneers fallback
export interface Pioneer {
  id: string;
  name: string;
  description?: string;
}





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

// Helper to render paragraphs for section content
function RenderParagraphs({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  if (!paragraphs || paragraphs.length === 0) return null;
  return (
    <div className="space-y-2 md:space-y-3">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className={className}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

// Create a wrapper component for each section to handle viewport detection
interface ViewportSectionProps {
  section: SectionConfig;
  // Notify parent when section becomes visible (enter). Parent uses this to set activeSection.
  onEnter: (sectionId: string) => void;
  // Notify parent when section leaves viewport
  onLeave?: (sectionId: string) => void;
}

const ViewportSection = ({
  section,
  onEnter,
  onLeave,
}: ViewportSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { inViewport, enterCount, leaveCount } = useInViewport(ref, {
    rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top, 60% from bottom
    threshold: 0.1,
  });

  useEffect(() => {
    // When the section becomes visible (enterCount increases), notify parent
    if (inViewport && enterCount > 0) {
      onEnter(section.id);
    }
    // When the section leaves viewport, notify parent
    if (!inViewport && leaveCount > 0 && typeof onLeave === 'function') {
      onLeave(section.id);
    }
  }, [inViewport, enterCount, leaveCount, section.id, onEnter, onLeave]);

  return (
    <div ref={ref} id={section.id}>
      {section.component}
    </div>
  );
};

export function StylePageClient({
  danceStyle,
  relatedStyles,
  styleTags,
}: StylePageClientProps) {
  const { applyTheme, clearTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const visibleSectionsRef = useRef<string[]>([]);
  const tNames = useTranslations('danceStyles.names');
  const tDescriptions = useTranslations('danceStyles.shortDescriptions');
  const tTags = useTranslations('danceTags');
  const tStyles = useTranslations();
  const tUi = useTranslations('stylesPage.ui');
  const tResourcesUi = useTranslations('resources.ui');
  const tOverview = useTranslations(
    `styles.detailed.${danceStyle.slug}.overview`
  );
  const tHistory = useTranslations(
    `styles.detailed.${danceStyle.slug}.history`
  );

  // Track visible sections and set activeSection to the last visible one
  const handleSectionEnter = (sectionId: string) => {
    const current = visibleSectionsRef.current;
    if (!current.includes(sectionId)) {
      visibleSectionsRef.current = [...current, sectionId];
      const nextActive =
        visibleSectionsRef.current[visibleSectionsRef.current.length - 1];
      if (activeSection !== nextActive) {
        setActiveSection(nextActive);
      }
    }
  };
  const handleSectionLeave = (sectionId: string) => {
    const current = visibleSectionsRef.current;
    visibleSectionsRef.current = current.filter((id) => id !== sectionId);
    const nextActive =
      visibleSectionsRef.current.length > 0
        ? visibleSectionsRef.current[visibleSectionsRef.current.length - 1]
        : 'overview';
    if (activeSection !== nextActive) {
      setActiveSection(nextActive);
    }
  };
  const hasContent = (): boolean => true;
  // Format all section data and translations here
  const allSections: SectionConfig[] = [
    {
      id: 'overview',
      labelKey: tStyles('stylesPage.sections.overview'),
      icon: '📖',
      accentColor: 'primary',
      component: (
        <DanceStyleSectionLayout
          id="overview"
          title={tStyles('stylesPage.sections.overview')}
          emoji="📖"
          accentColor="primary"
        >
          <RenderParagraphs
            paragraphs={(() => {
              try {
                return tOverview.raw('content') as string[];
              } catch {
                return [];
              }
            })()}
            className="text-body-md text-content-secondary leading-relaxed"
          />
        </DanceStyleSectionLayout>
      ),
    },
    {
      id: 'history',
      labelKey: tStyles('stylesPage.sections.history'),
      icon: '⏰',
      accentColor: 'secondary',
      component: (
        <DanceStyleSectionLayout
          id="history"
          title={tStyles('stylesPage.sections.history')}
          emoji="⏰"
          accentColor="secondary"
        >
          <div className="mb-8">
            <RenderParagraphs
              paragraphs={(() => {
                try {
                  return tHistory.raw('summary') as string[];
                } catch {
                  return [];
                }
              })()}
              className="text-body-md text-content-secondary leading-relaxed"
            />
          </div>
        </DanceStyleSectionLayout>
      ),
    },
    {
      id: 'pioneers',
      labelKey: tUi('pioneers'),
      icon: '⭐',
      accentColor: 'tertiary',
      component: (
        <DanceStyleSectionLayout
          id="pioneers"
          title={tUi('pioneers')}
          emoji="⭐"
          accentColor="tertiary"
        >
          <KeyFigures keyFigureIds={danceStyle.keyFigureIds || []} />
        </DanceStyleSectionLayout>
      ),
    },
    // Add landmarks section if the style has landmark IDs and valid landmarks exist
    ...(danceStyle.landmarkIds && danceStyle.landmarkIds.length > 0 && 
        danceStyle.landmarkIds.some(id => getLandmarkById(id)) ? [{
      id: 'landmarks',
      labelKey: tUi('historicLandmarks'),
      icon: '🏛️',
      accentColor: 'secondary' as const,
      component: (
        <DanceStyleSectionLayout
          id="landmarks"
          title={tUi('historicLandmarks')}
          emoji="🏛️"
          accentColor="secondary"
        >
          <LandmarksSection landmarkIds={danceStyle.landmarkIds} />
        </DanceStyleSectionLayout>
      ),
    }] : []),
    {
      id: 'resources',
      labelKey: tResourcesUi('moreResources'),
      icon: '📚',
      accentColor: 'primary',
      component: (
        <DanceStyleSectionLayout
          id="resources"
          title={tResourcesUi('moreResources')}
          emoji="📚"
          accentColor="primary"
        >
          <ResourcesSection danceStyleId={danceStyle.id} />
        </DanceStyleSectionLayout>
      ),
    },
    // {
    //   id: 'culture',
    //   labelKey: tStyles('stylesPage.sections.culture'),
    //   icon: '🌍',
    //   accentColor: 'primary',
    //   component: (
    //     <DanceStyleSectionLayout
    //       id="culture"
    //       title={tStyles('stylesPage.sections.culture')}
    //       emoji="🌍"
    //       accentColor="primary"
    //     >
    //       <p>{tStyles(`${danceStyle.id}.culture`)}</p>
    //     </DanceStyleSectionLayout>
    //   ),
    // },
    // {
    //   id: 'featured-video',
    //   labelKey: tStyles('stylesPage.sections.featuredVideo'),
    //   icon: '🎬',
    //   accentColor: 'tertiary',
    //   component: (
    //     <DanceStyleSectionLayout
    //       id="featured-video"
    //       title={tStyles('stylesPage.sections.featuredVideo')}
    //       emoji="🎬"
    //       accentColor="tertiary"
    //     >
    //       <FeaturedVideo
    //              onLeave={handleSectionLeave}
    //         video={
    //           danceStyle.featuredVideoId
    //             ? getVideoById(danceStyle.featuredVideoId)
    //             : undefined
    //         }
    //       />
    //     </DanceStyleSectionLayout>
    //   ),
    // },
    // {
    //   id: 'techniques',
    //   labelKey: tStyles('stylesPage.sections.techniques'),
    //   icon: '⚡',
    //   accentColor: 'secondary',
    // Notify parent when section leaves viewport
    //   component: (
    //     <DanceStyleSectionLayout
    //       id="techniques"
    //       title={tStyles('stylesPage.sections.techniques')}
    //       emoji="⚡"
    //       accentColor="secondary"
    //     >
    //       <p>{tStyles(`${danceStyle.id}.techniques`)}</p>
    //     </DanceStyleSectionLayout>
    //   ),
    // },
  ];

  // Filter sections based on content availability
  // const availableSections = allSections.filter(() => hasContent());

  // Always show related styles if available
  // if (relatedStyles && relatedStyles.length > 0) {
  //   allSections.push({
  //   labelKey: tStyles('stylesPage.sections.pioneers'),
  //   icon: '⭐',
  //   accentColor: 'tertiary',
  //   component: (
  //     <DanceStyleSectionLayout
  //       id="pioneers"
  //       title={tStyles('stylesPage.sections.pioneers')}
  //       emoji="⭐"
  //       accentColor="tertiary"
  //     >
  //       {/* Example: list of formatted pioneers */}
  //       <ul>
  //         {Array.isArray(
  //           (danceStyle as { pioneers?: Pioneer[] }).pioneers
  //         ) ? (
  //           (danceStyle as { pioneers?: Pioneer[] }).pioneers!.map(
  //             (pioneer) => (
  //               <li key={pioneer.id} className="mb-2">
  //                 <span className="font-bold text-content-primary">
  //                   {pioneer.name}
  //                 </span>
  //                 {pioneer.description && (
  //                   <span className="text-content-secondary ml-2">
  //                     {pioneer.description}
  //                   </span>
  //                 )}
  //               </li>
  //             )
  //           )
  //         ) : (
  //           <li className="text-content-tertiary">No pioneers listed.</li>
  //         )}
  //       </ul>
  //     </DanceStyleSectionLayout>
  //   ),
  // },
  // {
  //   id: 'culture',
  //   labelKey: tStyles('stylesPage.sections.culture'),
  //   icon: '🌍',
  //   accentColor: 'primary',
  //   component: (
  //     <DanceStyleSectionLayout
  //       id="culture"
  //       title={tStyles('stylesPage.sections.culture')}
  //       emoji="🌍"
  //       accentColor="primary"
  //     >
  //       <p>{tStyles(`${danceStyle.id}.culture`)}</p>
  //     </DanceStyleSectionLayout>
  //   ),
  // },
  // {
  //   id: 'featured-video',
  //   labelKey: tStyles('stylesPage.sections.featuredVideo'),
  //   icon: '🎬',
  //   accentColor: 'tertiary',
  //   component: (
  //     <DanceStyleSectionLayout
  //       id="featured-video"
  //       title={tStyles('stylesPage.sections.featuredVideo')}
  //       emoji="🎬"
  //       accentColor="tertiary"
  //     >
  //       <FeaturedVideo
  //         video={
  //           danceStyle.featuredVideoId
  //             ? getVideoById(danceStyle.featuredVideoId)
  //             : undefined
  //         }
  //       />
  //     </DanceStyleSectionLayout>
  //   ),
  // },
  // {
  //   id: 'techniques',
  //   labelKey: tStyles('stylesPage.sections.techniques'),
  //   icon: '⚡',
  //   accentColor: 'secondary',
  //   component: (
  //     <DanceStyleSectionLayout
  //       id="techniques"
  //       title={tStyles('stylesPage.sections.techniques')}
  //       emoji="⚡"
  //       accentColor="secondary"
  //     >
  //       <p>{tStyles(`${danceStyle.id}.techniques`)}</p>
  //     </DanceStyleSectionLayout>
  //   ),
  // },
  // ];

  // Filter sections based on content availability
  const availableSections = allSections.filter(() => hasContent());

  if (relatedStyles?.length) {
    availableSections.push({
      id: 'related',
      labelKey: tUi('relatedStyles'),
      icon: '🤝',
      accentColor: 'secondary',
      component: (
        <DanceStyleSectionLayout
          id="related"
          title={tUi('relatedStyles')}
          emoji="🤝"
          accentColor="secondary"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {relatedStyles.map((relatedStyle) => (
              <Link
                key={relatedStyle.slug}
                href={`/styles/${relatedStyle.slug}`}
                className="group block bg-surface-elevated/50 border border-stroke-secondary/40 rounded-lg p-4 hover:border-accent-primary/50 hover:bg-surface-elevated/70 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-body-md font-semibold text-content-primary group-hover:text-accent-primary transition-colors">
                    {tNames(relatedStyle.id)}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-content-tertiary group-hover:text-accent-primary transition-colors shrink-0 ml-2" />
                </div>

                <p className="text-body-sm text-content-secondary mb-3 leading-relaxed">
                  {tDescriptions(relatedStyle.id)}
                </p>

                <div className="flex items-center gap-3 text-body-xs text-content-tertiary">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{tStyles(relatedStyle.locationKey)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{tStyles(relatedStyle.eraKey)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </DanceStyleSectionLayout>
      ),
    });
  }

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
      <header className="relative overflow-hidden bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary border-b border-stroke-primary">
        {/* Dynamic Theme Background with Spotlight Effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${
              danceStyle.theme?.primary || '#f97316'
            }40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${
              danceStyle.theme?.secondary || '#ec4899'
            }30 0%, transparent 50%), radial-gradient(circle at 40% 40%, ${
              danceStyle.theme?.primary || '#f97316'
            }20 0%, transparent 70%)`,
          }}
        >
          {/* Animated spotlight effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 30% 20%, ${
                  danceStyle.theme?.primary || '#f97316'
                }40 0%, transparent 50%)`,
                `radial-gradient(circle at 70% 30%, ${
                  danceStyle.theme?.primary || '#f97316'
                }40 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 60%, ${
                  danceStyle.theme?.primary || '#f97316'
                }40 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 20%, ${
                  danceStyle.theme?.primary || '#f97316'
                }40 0%, transparent 50%)`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-content-tertiary text-body-sm mb-6">
              <Link
                href="/styles"
                className="hover:text-accent-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <span>/</span>
              <Link
                href="/styles"
                className="hover:text-accent-primary transition-colors"
              >
                {tUi('breadcrumbs.styles')}
              </Link>
              <span>/</span>
              <span className="text-content-secondary">
                {tNames(danceStyle.id)}
              </span>
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
                          'flex items-center gap-1.5 px-2.5 py-1 text-body-xs',
                          tag.color === 'primary' &&
                            'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
                          tag.color === 'secondary' &&
                            'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
                          tag.color === 'tertiary' &&
                            'bg-accent-tertiary/10 text-accent-tertiary border-accent-tertiary/20'
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
                <FeaturedVideo
                  video={getFeaturedVideoForStyle(danceStyle.id) || undefined}
                />
              </div>
            </div>

            {/* Mobile TOC Toggle */}
            <div className="lg:hidden mt-8">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-elevated border border-stroke-secondary rounded-xl text-content-primary hover:border-accent-primary/50 transition-colors"
              >
                <span className="font-medium">{tUi('tableOfContents')}</span>
                <ChevronRight
                  className={clsx(
                    'h-4 w-4 transition-transform',
                    isTocOpen && 'rotate-90'
                  )}
                />
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
                          'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-start transition-colors text-body-sm',
                          activeSection === section.id
                            ? 'bg-accent-primary/20 text-accent-primary'
                            : 'text-content-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                        )}
                      >
                        <span className="text-sm">{section.icon}</span>
                        <span>
                          {section.labelKey && section.labelKey.includes('.')
                            ? tStyles(section.labelKey)
                            : section.labelKey}
                        </span>
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
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${tNames(danceStyle.id)} - Street Dance Style Guide`,
            description: tDescriptions(danceStyle.id),
            image: `/images/styles/${danceStyle.slug}-hero.jpg`,
            author: {
              '@type': 'Organization',
              name: 'Dance Street Styles',
              url: 'https://dancestreetstyles.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Dance Street Styles',
              logo: {
                '@type': 'ImageObject',
                url: 'https://dancestreetstyles.com/logo.png',
              },
            },
            datePublished: '2024-01-01T00:00:00.000Z',
            dateModified: '2024-01-01T00:00:00.000Z',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://dancestreetstyles.com/styles/${danceStyle.slug}`,
            },
            about: {
              '@type': 'Thing',
              name: tNames(danceStyle.id),
              description: tDescriptions(danceStyle.id),
            },
            keywords: [
              tNames(danceStyle.id),
              'street dance',
              'hip hop culture',
              'dance style',
              tStyles(danceStyle.locationKey),
              tStyles(danceStyle.eraKey),
            ].join(', '),
          }),
        }}
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-4 lg:gap-8 min-w-0">
          {/* Desktop Sidebar TOC */}
          <aside
            className="hidden lg:block"
            role="navigation"
            aria-label="Table of contents"
          >
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
                        'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-start transition-all duration-200 text-body-sm',
                        activeSection === section.id
                          ? 'bg-accent-primary/20 text-accent-primary shadow-sm'
                          : 'text-content-secondary hover:text-accent-primary hover:bg-accent-primary/10'
                      )}
                      aria-current={
                        activeSection === section.id ? 'page' : undefined
                      }
                    >
                      <span className="text-sm" aria-hidden="true">
                        {section.icon}
                      </span>
                      <span>
                        {section.labelKey && section.labelKey.includes('.')
                          ? tStyles(section.labelKey)
                          : section.labelKey}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 min-w-0 overflow-hidden" role="main">
            <article className="space-y-4 md:space-y-6 min-w-0 overflow-hidden">
              {availableSections.map((section) => (
                <ViewportSection
                  key={section.id}
                  section={section}
                  onEnter={handleSectionEnter}
                  onLeave={handleSectionLeave}
                />
              ))}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
