"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../../../i18n/navigation';
import { notFound } from 'next/navigation';
import { MainNavigation } from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDanceStyleBySlug, getRelatedStyles } from '@/data/danceStyles';
import { useTheme } from '@/hooks/useTheme';
import { ArrowLeft, MapPin, Calendar, Users, Music, PlayCircle, ExternalLink } from 'lucide-react';

interface StylePageProps {
  params: Promise<{ slug: string }>;
}

export default function StylePage({ params }: StylePageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const { applyTheme, clearTheme } = useTheme();

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const danceStyle = resolvedParams ? getDanceStyleBySlug(resolvedParams.slug) : null;
  const relatedStyles = danceStyle ? getRelatedStyles(danceStyle.id) : [];

  useEffect(() => {
    if (danceStyle) {
      applyTheme(danceStyle.theme);
    }
    
    return () => {
      clearTheme();
    };
  }, [danceStyle, applyTheme, clearTheme]);

  if (resolvedParams && !danceStyle) {
    notFound();
  }

  if (!danceStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="relative px-4 py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {danceStyle.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {danceStyle.fullDescription}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{danceStyle.origins.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>{danceStyle.origins.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-accent" />
                    <span>{danceStyle.origins.culture}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {danceStyle.characteristics.slice(0, 4).map((characteristic, index) => (
                    <Badge key={index} variant="secondary">
                      {characteristic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-primary/60" />
                  <span className="ml-4 text-lg font-medium text-primary/60">
                    Featured Video Coming Soon
                  </span>
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
            className="absolute -bottom-40 -start-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 opacity-20"
            style={{ backgroundColor: danceStyle.theme.secondary }}
          />
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="moves">Key Moves</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Music className="mr-2 h-5 w-5 text-primary" />
                        Characteristics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {danceStyle.characteristics.map((characteristic, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                            {characteristic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Cultural Origins</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Location</h4>
                        <p className="text-muted-foreground">{danceStyle.origins.location}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Time Period</h4>
                        <p className="text-muted-foreground">{danceStyle.origins.year}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Cultural Context</h4>
                        <p className="text-muted-foreground">{danceStyle.origins.culture}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="moves" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {danceStyle.keyMoves.map((move, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{move}</h3>
                          <Badge variant="outline">Key Move</Badge>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          Detailed tutorial and breakdown coming soon.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="artists" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {danceStyle.influentialArtists.map((artist, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {artist.name}
                          <Badge variant="secondary">{artist.role}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {artist.bio}
                        </p>
                        {artist.socialLinks && (
                          <div className="flex gap-2 mt-4">
                            {artist.socialLinks.youtube && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={artist.socialLinks.youtube} target="_blank">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  YouTube
                                </Link>
                              </Button>
                            )}
                            {artist.socialLinks.instagram && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href={artist.socialLinks.instagram} target="_blank">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Instagram
                                </Link>
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="music" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Music className="mr-2 h-5 w-5 text-primary" />
                      Music Genres
                    </CardTitle>
                    <CardDescription>
                      The musical styles that define and inspire {danceStyle.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {danceStyle.musicGenres.map((genre, index) => (
                        <Badge key={index} variant="default" className="text-sm py-2 px-4">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {danceStyle.timeline.map((event, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div 
                              className={`w-4 h-4 rounded-full ${
                                event.significance === 'high' 
                                  ? 'bg-primary' 
                                  : event.significance === 'medium' 
                                  ? 'bg-secondary' 
                                  : 'bg-muted'
                              }`} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <Badge variant="outline">{event.year}</Badge>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Styles */}
      {relatedStyles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Related Styles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStyles.map((style) => (
                  <Link key={style.id} href={`/styles/${style.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                      <div 
                        className="h-2 w-full"
                        style={{ backgroundColor: style.theme.primary }}
                      />
                      <CardHeader className="pb-3">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {style.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">
                          {style.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
