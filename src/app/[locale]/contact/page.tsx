import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact.seo');
  const tHero = await getTranslations('contact.hero');
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [{
        url: `/api/og/dynamic?title=${encodeURIComponent(tHero('title'))}&subtitle=${encodeURIComponent(tHero('badges.feedback'))}`,
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

export default async function ContactPage() {
  const t = await getTranslations('contact');
  
  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        badges={[
          t('hero.badges.open'),
          t('hero.badges.community'),
          t('hero.badges.feedback')
        ]}
        backgroundVariant="culture"
      />

      {/* Contact Section */}
      <Section background="primary" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-header-lg font-black text-content-primary mb-8 magazine-headline">
            {t('main.title')}
          </h2>
          <div className="space-y-6 mb-12">
            {t.raw('main.content').map((paragraph: string, index: number) => (
              <p key={index} className="text-body-lg text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-surface-elevated border border-stroke-primary rounded-2xl">
              <h3 className="text-header-sm font-black text-content-primary mb-4">
                {t('feedback.title')}
              </h3>
              <p className="text-content-secondary mb-6">
                {t('feedback.description')}
              </p>
              <a
                // href="mailto:feedback@streetdanceculture.com"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-black font-bold hover:from-accent-primary/90 hover:to-accent-secondary/90 transition-all duration-300 rounded-xl uppercase tracking-wider magazine-sans text-body-sm"
              >
                Send Feedback
              </a>
            </div>

            <div className="p-8 bg-surface-elevated border border-stroke-primary rounded-2xl">
              <h3 className="text-header-sm font-black text-content-primary mb-4">
                {t('contribute.title')}
              </h3>
              <p className="text-content-secondary mb-6">
                {t('contribute.description')}
              </p>
              <a
                // href="mailto:contribute@streetdanceculture.com"
                className="inline-flex items-center px-6 py-3 border-2 border-stroke-primary text-content-primary font-bold hover:border-accent-primary hover:text-accent-primary transition-colors rounded-xl uppercase tracking-wider magazine-sans text-body-sm"
              >
                Get Involved
              </a>
            </div>
          </div>

          <div className="p-8 bg-surface-secondary border border-stroke-primary rounded-2xl">
            <h3 className="text-header-sm font-black text-content-primary mb-4">
              {t('response.title')}
            </h3>
            <p className="text-content-tertiary">
              {t('response.description')}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
