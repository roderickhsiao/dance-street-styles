"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../../../i18n/navigation';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainNavigation } from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDanceStyleBySlug, getRelatedStyles } from '@/data/danceStyles';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';

interface StylePageProps {
  params: Promise<{ slug: string }>;
}

export default function StylePage({ params }: StylePageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const { applyTheme, clearTheme } = useTheme();
  const tNames = useTranslations('danceStyles.names');
  const tDescriptions = useTranslations('danceStyles.shortDescriptions');

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const danceStyle = resolvedParams ? getDanceStyleBySlug(resolvedParams.slug) : null;
  const relatedStyles = danceStyle ? getRelatedStyles(danceStyle.id) : [];

  useEffect(() => {
    if (danceStyle) {
      applyTheme(danceStyle.theme);
      return () => clearTheme();
    }
  }, [danceStyle, applyTheme, clearTheme]);

  if (!danceStyle || !resolvedParams) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="relative px-4 py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/styles" className="text-muted-foreground hover:text-primary">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Styles
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {tNames(danceStyle.id)}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {tDescriptions(danceStyle.id)}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Origins</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>Historical</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-accent" />
                    <span>Cultural</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    Content coming soon
                  </Badge>
                </div>
              </div>

              {/* Placeholder for media content */}
              <div className="relative">
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">Media content coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -end-40 w-80 h-80 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ backgroundColor: danceStyle.theme.primary }}
          />
          <div 
            className="absolute -bottom-40 -start-40 w-80 h-80 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ backgroundColor: danceStyle.theme.secondary }}
          />
        </div>
      </section>

      {/* Related Styles */}
      {relatedStyles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Styles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStyles.map((style) => (
                <Link key={style.id} href={`/styles/${style.slug}`}>
                  <div className="p-6 bg-card rounded-xl hover:shadow-lg transition-all duration-300 border">
                    <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                      {tNames(style.id)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tDescriptions(style.id)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
