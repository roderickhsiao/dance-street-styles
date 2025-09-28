import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about.seo');
  const tHero = await getTranslations('about.hero');
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{
        url: `/opengraph-image?title=${encodeURIComponent(tHero('title'))}&subtitle=${encodeURIComponent(tHero('badges.mission'))}`,
        width: 1200,
        height: 630,
        alt: t('title')
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  
  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        badges={[
          t('hero.badges.status'),
          t('hero.badges.mission'),
          t('hero.badges.community')
        ]}
        backgroundVariant="gradient"
      />

      {/* Mission Section */}
      <Section background="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-12 text-center magazine-headline">
            {t('mission.title')}
          </h2>
          <div className="space-y-6">
            {t.raw('mission.content').map((paragraph: string, index: number) => (
              <p key={index} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Approach Section */}
      <Section background="secondary" padding="xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-12 text-center magazine-headline">
            {t('approach.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {t.raw('approach.principles').map((principle: { title: string; description: string }, index: number) => (
              <div
                key={index}
                className="p-8 bg-surface-elevated/50 backdrop-blur-sm border border-stroke-primary rounded-2xl hover:border-accent-primary/50 transition-all duration-300"
              >
                <h3 className="text-header-sm font-black text-content-primary mb-4 magazine-headline">
                  {principle.title}
                </h3>
                <p className="text-content-secondary leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Content & Sources Section */}
      <Section background="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-8 text-center magazine-headline">
            {t('content.title')}
          </h2>
          <p className="text-body-lg text-content-secondary mb-8 leading-relaxed text-center">
            {t('content.description')}
          </p>
          
          <ul className="space-y-4 mb-8">
            {t.raw('content.sources').map((source: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-primary me-3 mt-1 font-bold">•</span>
                <span className="text-content-secondary">{source}</span>
              </li>
            ))}
          </ul>

          <div className="p-6 bg-surface-elevated border border-stroke-primary rounded-2xl">
            <p className="text-body-md text-content-tertiary italic text-center">
              {t('content.note')}
            </p>
          </div>
        </div>
      </Section>

      {/* Feedback Section */}
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-header-lg font-black text-content-primary mb-8 magazine-headline">
            {t('feedback.title')}
          </h2>
          <div className="space-y-6 mb-8">
            {t.raw('feedback.content').map((paragraph: string, index: number) => (
              <p key={index} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="p-8 bg-surface-elevated border-2 border-accent-primary/20 rounded-2xl">
            <h3 className="text-header-sm font-black text-content-primary mb-4">
              {t('feedback.cta')}
            </h3>
            <p className="text-body-md text-content-secondary mb-6">
              {t('feedback.contact')}
            </p>
            <a
              // href="mailto:contact@streetdanceculture.com"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 rounded-xl uppercase tracking-wider magazine-sans"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </Section>

      {/* Recognition Section */}
      <Section background="primary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-8 text-center magazine-headline">
            {t('recognition.title')}
          </h2>
          <div className="space-y-6">
            {t.raw('recognition.content').map((paragraph: string, index: number) => (
              <p key={index} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Cultural Learning Section */}
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-8 text-center magazine-headline">
            {t('culturalLearning.title')}
          </h2>
          <div className="space-y-6 mb-8">
            {t.raw('culturalLearning.content').map((paragraph: string, index: number) => (
              <p key={index} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="text-center p-8 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-2xl">
            <p className="text-header-sm font-black text-accent-primary magazine-headline">
              {t('culturalLearning.callToAction')}
            </p>
          </div>
        </div>
      </Section>

      {/* Technical Section */}
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-lg font-black text-content-primary mb-8 text-center magazine-headline">
            {t('technical.title')}
          </h2>
          <p className="text-body-lg text-content-secondary mb-8 leading-relaxed text-center">
            {t('technical.description')}
          </p>
          
          <ul className="space-y-3 mb-8">
            {t.raw('technical.tech').map((tech: string, index: number) => (
              <li key={index} className="flex items-start ">
                <span className="text-accent-primary me-3 mt-1 font-bold">→</span>
                <span className="text-content-secondary">{tech}</span>
              </li>
            ))}
          </ul>

          <div className="p-6 bg-surface-elevated border border-stroke-primary rounded-2xl text-center">
            <p className="text-body-md text-content-tertiary mb-4">
              {t('technical.code')}
            </p>
            <a
              href="https://github.com/roderickhsiao/dance-street-styles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-stroke-primary text-content-primary font-bold hover:border-accent-primary hover:text-accent-primary transition-colors rounded-xl uppercase tracking-wider magazine-sans text-body-sm"
            >
              View Source Code
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
