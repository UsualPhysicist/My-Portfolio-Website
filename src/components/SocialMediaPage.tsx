import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DesignImage {
  url: string;
  title: string;
}

const SOCIAL_MEDIA_DESIGNS: DesignImage[] = [
  { url: "https://i.ibb.co/9348YDX8/Collab-post-thumbnail.png", title: "Collab post thumbnail" },
  { url: "https://i.ibb.co/7xYZLR7j/Mapalatte-Insta-post.png", title: "Mapalatte Insta post" },
  { url: "https://i.ibb.co/SXKjZSvz/Marble-Mandir-Instagram-Posts.png", title: "Marble Mandir Instagram Posts" },
  { url: "https://i.ibb.co/hzLjPsy/Make-Break-Hackathon-post.png", title: "Make Break Hackathon post" },
  { url: "https://i.ibb.co/F4J3S1Vn/Instagram-post-final.png", title: "Instagram post final" },
  { url: "https://i.ibb.co/dwG0dnnd/Highlight-covers.png", title: "Highlight covers" },
  { url: "https://i.ibb.co/1J7DyM0Y/Trophy-Sticker-Template.png", title: "Trophy Sticker Template" },
  { url: "https://i.ibb.co/yFDX20NG/Farewell-Post-template.png", title: "Farewell Post template" },
  { url: "https://i.ibb.co/WN61kGS1/5-days-to-go-story.png", title: "5 days to go story" },
  { url: "https://i.ibb.co/pvJ8p0wm/3-days-to-go.png", title: "3 days to go" },
  { url: "https://i.ibb.co/k2wmvnNj/Spherical-Text-Effect.png", title: "Spherical Text Effect" },
  { url: "https://i.ibb.co/NgZ78JnV/14-days-insta-story.png", title: "14 days insta story" },
  { url: "https://i.ibb.co/SwcyXXbb/Maya-Fabrics-Business-card-2.png", title: "Maya Fabrics Business card 2" },
  { url: "https://i.ibb.co/4DnDLk2/BGMI-poster-2.png", title: "BGMI poster 2" },
  { url: "https://i.ibb.co/NgyPqVrz/Esports-Battle-Insta-Post.png", title: "Esports Battle Insta Post" },
  { url: "https://i.ibb.co/x8dnWNpL/Genesis-Roadmap.png", title: "Genesis Roadmap" },
  { url: "https://i.ibb.co/W46FL9jr/Hackcrux-V2-timeline-insta-post.png", title: "Hackcrux V2 timeline insta post" },
  { url: "https://i.ibb.co/XxzpHQBs/handband-2.png", title: "handband 2" },
  { url: "https://i.ibb.co/QsKHfPX/Plinth-26-Sponsor-Template.png", title: "Plinth 26 Sponsor Template" },
  { url: "https://i.ibb.co/6RVnYd88/Simply-Better-Insta-Carousel-Post-1.png", title: "Simply Better Insta Carousel Post 1" },
  { url: "https://i.ibb.co/4wvGRq4F/Enigma-post.png", title: "Enigma post" },
  { url: "https://i.ibb.co/G46t5LrH/Website-story.png", title: "Website story" },
  { url: "https://i.ibb.co/RGxFGD0F/Certificate-of-Winning-3.png", title: "Certificate of Winning 3" },
  { url: "https://i.ibb.co/vFZLQkv/Brochure-front-draft.png", title: "Brochure front draft" },
  { url: "https://i.ibb.co/tGnp2Yt/Plinth-25-Timeline.png", title: "Plinth 25 Timeline" }
];

interface SocialMediaPageProps {
  onBack: () => void;
}

export default function SocialMediaPage({ onBack }: SocialMediaPageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SOCIAL_MEDIA_DESIGNS.length);
  };

  const prevSlide = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SOCIAL_MEDIA_DESIGNS.length) % SOCIAL_MEDIA_DESIGNS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isZoomed) return;
      if (e.key === 'Escape') setIsZoomed(false);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary font-sans selection:bg-brand-accent selection:text-white pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-primary/10 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button 
            onClick={onBack}
            aria-label="Go back to home page"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold tracking-tighter">
            SOCIAL<span className="text-brand-accent">MEDIA</span>
          </h1>
        </div>
      </header>

      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Social Media Designs</h2>
            <p className="text-xl text-brand-secondary max-w-2xl">
              Engaging, shareable, and platform-optimized visual assets designed to boost online presence and audience interaction.
            </p>
          </motion.div>
        </div>

        {/* Running Train Section */}
        <section 
          className="w-full bg-brand-card/30 py-20 border-y border-brand-primary/5 overflow-hidden"
          aria-label="Social Media Collection Carousel"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
            <h3 className="text-2xl font-bold">Social Media Collection</h3>
            <p className="text-brand-secondary">A continuous loop of my latest social media projects.</p>
          </div>

          <div className="relative flex items-center overflow-hidden">
            <motion.div 
              className="flex gap-8 whitespace-nowrap"
              animate={{ x: [0, -2500] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              role="list"
            >
              {/* Triple the images for seamless loop */}
              {[...SOCIAL_MEDIA_DESIGNS, ...SOCIAL_MEDIA_DESIGNS, ...SOCIAL_MEDIA_DESIGNS].map((img, idx) => (
                <div 
                  key={`${img.url}-${idx}`} 
                  role="listitem"
                  className="h-[400px] w-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/10 group relative cursor-zoom-in focus-within:ring-2 focus-within:ring-brand-accent outline-none"
                  tabIndex={0}
                  aria-label={`View ${img.title} in full screen`}
                  onClick={() => {
                    setCurrentIndex(idx % SOCIAL_MEDIA_DESIGNS.length);
                    setIsZoomed(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentIndex(idx % SOCIAL_MEDIA_DESIGNS.length);
                      setIsZoomed(true);
                    }
                  }}
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-bold text-sm">{img.title}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Seamless Loop • Running Train View</p>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label="Close lightbox"
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110] focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-full p-2"
              onClick={() => setIsZoomed(false)}
            >
              <X size={40} />
            </motion.button>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-4 md:inset-x-12 flex items-center justify-between z-[110] pointer-events-none">
              <button 
                onClick={prevSlide}
                aria-label="Previous image"
                className="p-4 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-brand-accent transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextSlide}
                aria-label="Next image"
                className="p-4 rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-brand-accent transition-all pointer-events-auto focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              aria-live="polite"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={SOCIAL_MEDIA_DESIGNS[currentIndex].url}
                alt={SOCIAL_MEDIA_DESIGNS[currentIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="mt-6 text-center">
                <h4 className="text-white text-xl font-bold mb-1">{SOCIAL_MEDIA_DESIGNS[currentIndex].title}</h4>
                <p className="text-white/50 text-sm uppercase tracking-widest">Social Media Collection</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
