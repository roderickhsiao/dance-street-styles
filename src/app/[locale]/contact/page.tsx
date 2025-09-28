import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/ui/hero';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/features/contact-form';
import type { Metadata } from 'next';

// Add ISR with 1 day revalidation for contact page
export const revalidate = 86400;

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
        backgroundVariant="street"
      />

      {/* Main Content */}
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Introduction */}
          <div>
            <h2 className="text-header-md font-semibold text-content-primary mb-6">
              {t('main.title')}
            </h2>
            <div className="space-y-4 text-content-secondary">
              {t.raw('main.content').map((paragraph: string, index: number) => (
                <p key={index} className="text-body-md leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </Section>

      {/* Contact Information */}
      <Section background="secondary" padding="xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-header-md font-semibold text-content-primary mb-8 text-start">
            How We Can Help Each Other
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-surface-primary border border-stroke-secondary rounded-lg">
              <h3 className="font-semibold text-content-primary mb-3">
                {t('feedback.title')}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed">
                {t('feedback.description')}
              </p>
            </div>

            <div className="p-6 bg-surface-primary border border-stroke-secondary rounded-lg">
              <h3 className="font-semibold text-content-primary mb-3">
                {t('contribute.title')}
              </h3>
              <p className="text-content-secondary text-body-sm leading-relaxed">
                {t('contribute.description')}
              </p>
            </div>
          </div>

          {/* Response Time */}
          <div className="p-6 bg-surface-elevated/30 border-s-4 border-accent-primary rounded-r-lg">
            <h3 className="font-semibold text-content-primary mb-3">
              {t('response.title')}
            </h3>
            <p className="text-content-secondary text-body-sm italic">
              {t('response.description')}
            </p>
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section background="primary" padding="xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-header-md font-semibold text-content-primary mb-8">
            Ready to Reach Out?
          </h2>
          <ContactForm />
        </div>
      </Section>
    </div>
  );
}
