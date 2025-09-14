"use client";

import { motion } from 'framer-motion';
import { MainNavigation } from '@/components/MainNavigation';
import { DanceStyleCard } from '@/components/DanceStyleCard';
import { LiquidGlassCard } from '@/components/LiquidGlassCard';
import { getAllDanceStyles } from '@/data/danceStyles';

export default function StylesPage() {
  const danceStyles = getAllDanceStyles();

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
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <LiquidGlassCard 
              className="max-w-4xl mx-auto p-12" 
              variant="regular" 
              role="content"
              theme="default"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                  DANCE STYLES
                </span>
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
                Explore the rich tapestry of street dance culture. Each style tells a story 
                of community, creativity, and cultural revolution.
              </p>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </section>

      {/* Dance Styles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {danceStyles.map((style) => (
              <motion.div key={style.id} variants={itemVariants}>
                <DanceStyleCard
                  title={style.name}
                  description={style.shortDescription}
                  origin={style.origins.location}
                  year={style.origins.year.toString()}
                  characteristics={style.characteristics}
                  themeColor={style.theme.primary}
                  onClick={() => window.location.href = `/styles/${style.slug}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <LiquidGlassCard 
              theme="orange" 
              className="max-w-4xl mx-auto p-12 text-center" 
              variant="clear" 
              role="content"
            >
              <blockquote className="text-3xl md:text-4xl font-light italic text-white mb-8">
                &ldquo;Street dance is not just about movement—it&apos;s about telling the story 
                of a community, a culture, a way of life.&rdquo;
              </blockquote>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full"></div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
