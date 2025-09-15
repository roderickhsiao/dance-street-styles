"use client";

import { motion } from '@/lib/motion';

interface TimelineEvent {
  year: string;
  title: string;
  location: string; 
  description: string;
  icon: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
}

export const Timeline = ({ events, title, className = "" }: TimelineProps) => {
  return (
    <section className={`py-20 px-2 md:px-6 bg-surface-secondary ${className}`}>
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="text-header-lg font-black mb-16 text-center text-content-primary magazine-headline">
            {title}
          </h2>
        )}
        
        <div className="relative">
          {/* Timeline line - start-aligned on mobile, centered on desktop */}
          <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary z-0 md:start-1/2 md:-translate-x-0.5"></div>
          
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative mb-12"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot - positioned relative to timeline line */}
              <div className="absolute start-6 w-4 h-4 bg-surface-primary border-2 border-accent-primary rounded-full z-10 md:start-1/2 md:-translate-x-2"></div>
              
              {/* Desktop layout - alternating sides */}
              <div className="hidden md:flex md:items-center">
                {index % 2 === 0 ? (
                  <>
                    {/* Left side content (even indexes) */}
                    <div className="w-1/2 pe-12">
                      <div className="text-end">
                        <div className="text-accent-primary text-body-sm font-bold mb-2 magazine-sans">
                          <span className="text-header-sm font-black magazine-headline">{event.icon}</span>
                          <span className="ms-2 text-content-primary font-bold text-body-md magazine-headline">
                            {event.year}
                          </span>
                          <span className="text-content-tertiary text-body-sm magazine-sans font-medium ms-2">
                            • {event.location}
                          </span>
                        </div>
                        <h3 className="font-bold text-content-primary mb-2 magazine-headline text-body-md text-end">
                          {event.title}
                        </h3>
                        <p className="text-content-secondary text-body-sm leading-normal magazine-body font-medium text-end">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    {/* Empty right side */}
                    <div className="w-1/2"></div>
                  </>
                ) : (
                  <>
                    {/* Empty left side */}
                    <div className="w-1/2"></div>
                    {/* Right side content (odd indexes) */}
                    <div className="w-1/2 ps-12">
                      <div className="text-start">
                        <div className="text-accent-primary text-body-sm font-bold mb-2 magazine-sans">
                          <span className="text-header-sm font-black magazine-headline">{event.icon}</span>
                          <span className="ms-2 text-content-primary font-bold text-body-md magazine-headline">
                            {event.year}
                          </span>
                          <span className="text-content-tertiary text-body-sm magazine-sans font-medium">
                            • {event.location}
                          </span>
                        </div>
                        <h3 className="font-bold text-content-primary mb-2 magazine-headline text-body-md text-start">
                          {event.title}
                        </h3>
                        <p className="text-content-secondary text-body-sm leading-normal magazine-body font-medium text-start">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Mobile layout - all items on left side */}
              <div className="md:hidden ps-16">
                <div className="text-start">
                  <div className="text-accent-primary text-body-sm font-bold mb-2 magazine-sans">
                    <span className="text-header-sm font-black magazine-headline">{event.icon}</span>
                    <span className="ms-2 text-content-primary font-bold text-body-md magazine-headline">
                      {event.year}
                    </span>
                    <span className="text-content-tertiary text-body-sm magazine-sans font-medium">
                      • {event.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-content-primary mb-2 magazine-headline text-body-md">
                    {event.title}
                  </h3>
                  <p className="text-content-secondary text-body-sm leading-normal magazine-body font-medium">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
