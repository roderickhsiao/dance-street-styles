import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ContactModal } from '@/components/features/contact-modal';
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
        url: `/api/og/dynamic?title=${encodeURIComponent(tHero('title'))}&subtitle=${encodeURIComponent(tHero('badges.mission'))}`,
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

            {/* Main Content */}
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Mission */}
          <div>
            <h2 className="text-header-md font-semibold text-content-primary mb-4">
              {t('mission.title')}
            </h2>
            <div className="space-y-4 text-content-secondary">
              {t.raw('mission.content').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Acknowledgment */}
          <div>
            <h2 className="text-header-md font-semibold text-content-primary mb-4">
              {t('acknowledgment.title')}
            </h2>
            <div className="space-y-4 text-content-secondary">
              {t.raw('acknowledgment.content').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Cultural Learning */}
          <div className="p-6 bg-surface-elevated/30 border-s-4 border-accent-primary rounded-r-lg">
            <q className="text-content-primary font-medium italic">
              {t('quote')}
            </q>
          </div>

        </div>
      </Section>

      {/* Contact & Contribute */}
      <Section background="secondary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-header-md font-semibold text-content-primary mb-6">
            {t('feedback.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact */}
            <div className="p-6 bg-surface-primary border border-stroke-secondary rounded-lg">
              <h3 className="font-semibold text-content-primary mb-3">{t('feedback.contact.title')}</h3>
              <p className="text-content-secondary text-body-sm mb-4 leading-relaxed">
                {t('feedback.contact.description')}
              </p>
              <ContactModal triggerText={t('feedback.contact.button')} />
            </div>

            {/* GitHub */}
            <div className="p-6 bg-surface-primary border border-stroke-secondary rounded-lg">
              <h3 className="font-semibold text-content-primary mb-3">{t('feedback.github.title')}</h3>
              <p className="text-content-secondary text-body-sm mb-4 leading-relaxed">
                {t('feedback.github.description')}
              </p>
              <a
                href="https://github.com/roderickhsiao/dance-street-styles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-stroke-primary text-content-primary font-medium hover:border-accent-primary hover:text-accent-primary transition-colors rounded-lg text-body-sm"
              >
                {t('feedback.github.button')}
              </a>
            </div>
          </div>
        </div>
      </Section>




    </div>
  );
}
