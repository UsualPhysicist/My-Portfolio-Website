import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface DesignImage {
  url: string;
  title: string;
}

interface DesignSectionProps {
  title: string;
  images: DesignImage[];
  aspectRatio?: string;
}

const DesignSection = ({ title, images, aspectRatio = "aspect-[1290/900]" }: DesignSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleManualNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsManualMode(true);
    nextSlide();
  };

  const handleManualPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsManualMode(true);
    prevSlide();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setIsManualMode(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isHovered && !isZoomed && !isManualMode) {
      intervalRef.current = setInterval(nextSlide, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, isZoomed, isManualMode, images.length]);

  return (
    <>
      <div 
        className="group relative overflow-hidden rounded-3xl bg-brand-card border border-brand-primary/10 shadow-lg transition-all duration-500 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`${aspectRatio} relative overflow-hidden cursor-zoom-in`}
          onClick={() => setIsZoomed(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          {/* Manual Controls - Always Visible */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-20">
            <button 
              onClick={handleManualPrev}
              className="p-3 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-brand-accent hover:scale-110 transition-all pointer-events-auto shadow-lg border border-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleManualNext}
              className="p-3 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-brand-accent hover:scale-110 transition-all pointer-events-auto shadow-lg border border-white/10"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Navigation - Always Visible */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentIndex ? 'bg-brand-accent w-8' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white/90 text-sm font-bold tracking-wide">
                  {images[currentIndex].title} ({currentIndex + 1} / {images.length})
                </span>
                <Maximize2 size={16} className="text-white/70" />
              </div>
              <ExternalLink className="text-white/90" size={20} />
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold group-hover:text-brand-accent transition-colors">{title}</h3>
            {isManualMode && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">Manual Mode</span>
            )}
          </div>
          <p className="text-brand-secondary">
            Explore the {title}. {isManualMode ? "Manual navigation enabled." : "Hover to auto-play, click to zoom."}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center overflow-hidden"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setIsZoomed(false)}
            >
              <X size={40} />
            </motion.button>

            {(title === "Plinth'26 Brochure" || title === "HackCrux'26 Brochure") ? (
              <div className="w-full relative flex items-center overflow-hidden py-20">
                <motion.div 
                  className="flex gap-8 whitespace-nowrap"
                  animate={{ 
                    x: [0, "-33.33%"], 
                  }}
                  transition={{ 
                    duration: 60, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ width: "fit-content" }}
                >
                  {/* Triple the images to ensure seamless loop regardless of screen width */}
                  {[...images, ...images, ...images].map((img, idx) => (
                    <div key={`${img.url}-${idx}`} className={`h-[60vh] md:h-[75vh] flex-shrink-0 ${aspectRatio} rounded-xl overflow-hidden shadow-2xl border border-white/10`}>
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center p-4 md:p-12 w-full h-full">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={images[currentIndex].url}
                  alt={images[currentIndex].title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  referrerPolicy="no-referrer"
                />
                <div className="mt-8 text-center">
                  <h4 className="text-white text-xl font-bold mb-1">{images[currentIndex].title}</h4>
                  <p className="text-white/50 text-sm uppercase tracking-widest">{title}</p>
                </div>
              </div>
            )}

            {(title === "Plinth'26 Brochure" || title === "HackCrux'26 Brochure") && (
              <div className="absolute bottom-12 text-center">
                <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Seamless Loop • Running Train View</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface BrochuresPageProps {
  onBack: () => void;
}

export default function BrochuresPage({ onBack }: BrochuresPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Plinth'26 Brochure",
      images: [
        { url: "https://i.ibb.co/9m2nPMjs/page-1.png", title: "Plinth'26 Page 1" },
        { url: "https://i.ibb.co/cXKMzkyb/page2.png", title: "Plinth'26 Page 2" },
        { url: "https://i.ibb.co/JbTtdPv/page3.png", title: "Plinth'26 Page 3" },
        { url: "https://i.ibb.co/r2wQ0zG4/page4.png", title: "Plinth'26 Page 4" },
        { url: "https://i.ibb.co/WWjX8fg7/page5.png", title: "Plinth'26 Page 5" },
        { url: "https://i.ibb.co/3yhTG8st/page6.png", title: "Plinth'26 Page 6" },
        { url: "https://i.ibb.co/BHwR2X2j/page7.png", title: "Plinth'26 Page 7" },
        { url: "https://i.ibb.co/JWtyNWT6/page8.png", title: "Plinth'26 Page 8" },
        { url: "https://i.ibb.co/NdQ0Y39G/page10.png", title: "Plinth'26 Page 9" },
        { url: "https://i.ibb.co/BHkJVsmK/page11.png", title: "Plinth'26 Page 10" },
        { url: "https://i.ibb.co/zWDL2r8G/page12.png", title: "Plinth'26 Page 11" },
        { url: "https://i.ibb.co/C5HmLYRc/page13.png", title: "Plinth'26 Page 12" },
        { url: "https://i.ibb.co/qYBxk6zx/page14.png", title: "Plinth'26 Page 13" },
        { url: "https://i.ibb.co/cSRTXhGw/page15.png", title: "Plinth'26 Page 14" },
        { url: "https://i.ibb.co/hFQfFnTp/page16.png", title: "Plinth'26 Page 15" },
        { url: "https://i.ibb.co/zhHDWQW4/page17.png", title: "Plinth'26 Page 16" },
        { url: "https://i.ibb.co/JRfzGS8D/page18.png", title: "Plinth'26 Page 17" },
        { url: "https://i.ibb.co/Lh5wXm6H/page19.png", title: "Plinth'26 Page 18" },
        { url: "https://i.ibb.co/sLWSLpF/page20.png", title: "Plinth'26 Page 19" },
        { url: "https://i.ibb.co/dJXxfw3B/page21.png", title: "Plinth'26 Page 20" },
        { url: "https://i.ibb.co/8n1kH9df/page22.png", title: "Plinth'26 Page 21" },
        { url: "https://i.ibb.co/nMZ9vhWc/page23.png", title: "Plinth'26 Page 22" },
        { url: "https://i.ibb.co/RkQB3C4f/page24.png", title: "Plinth'26 Page 23" },
        { url: "https://i.ibb.co/GvMv7k4x/page25.png", title: "Plinth'26 Page 24" },
        { url: "https://i.ibb.co/PGQ9hhjt/page26.png", title: "Plinth'26 Page 25" },
        { url: "https://i.ibb.co/wNv5cmbt/page27.png", title: "Plinth'26 Page 26" },
        { url: "https://i.ibb.co/gL3mhLWH/page28.png", title: "Plinth'26 Page 27" },
        { url: "https://i.ibb.co/Pv7tbDtj/page29.png", title: "Plinth'26 Page 28" },
        { url: "https://i.ibb.co/TMyTMKTt/page30.png", title: "Plinth'26 Page 29" },
        { url: "https://i.ibb.co/fd7YPhdG/page31.png", title: "Plinth'26 Page 30" },
        { url: "https://i.ibb.co/dJK1V8tw/page32.png", title: "Plinth'26 Page 31" },
        { url: "https://i.ibb.co/1Y2pX5wn/page33.png", title: "Plinth'26 Page 32" },
        { url: "https://i.ibb.co/KjbbnqDm/page34.png", title: "Plinth'26 Page 33" },
        { url: "https://i.ibb.co/bMtVh4sK/page35.png", title: "Plinth'26 Page 34" },
        { url: "https://i.ibb.co/j9xkFHxg/page36.png", title: "Plinth'26 Page 35" },
        { url: "https://i.ibb.co/Vp3fnvpW/page37.png", title: "Plinth'26 Page 36" },
        { url: "https://i.ibb.co/LdTk5nDR/page38.png", title: "Plinth'26 Page 37" },
      ]
    },
    {
      title: "Plinth'25 PR Brochure",
      images: [
        { url: "https://i.ibb.co/hF4VhVMn/Frame-18.png", title: "Plinth'25 PR Page 1" },
        { url: "https://i.ibb.co/2mdPZgh/Frame-19.png", title: "Plinth'25 PR Page 2" },
      ]
    },
    {
      title: "HackCrux'26 Brochure",
      aspectRatio: "aspect-[210/297]",
      images: [
        { url: "https://i.ibb.co/twmcYgJM/Frame-514617359.png", title: "HackCrux'26 Page 1" },
        { url: "https://i.ibb.co/B5Ys8Jpt/Frame-514617370.png", title: "HackCrux'26 Page 2" },
        { url: "https://i.ibb.co/GfcrH7PK/Frame-514617369.png", title: "HackCrux'26 Page 3" },
        { url: "https://i.ibb.co/BVM7Lt4H/Frame-514617358.png", title: "HackCrux'26 Page 4" },
        { url: "https://i.ibb.co/xqJSpsz5/Frame-514617368.png", title: "HackCrux'26 Page 5" },
        { url: "https://i.ibb.co/TnTKk6x/Frame-514617367.png", title: "HackCrux'26 Page 6" },
        { url: "https://i.ibb.co/vx7HwLZh/Frame-514617366.png", title: "HackCrux'26 Page 7" },
        { url: "https://i.ibb.co/rR9X9y3z/Frame-514617365.png", title: "HackCrux'26 Page 8" },
        { url: "https://i.ibb.co/vxmqTG2z/Frame-514617360.png", title: "HackCrux'26 Page 9" },
        { url: "https://i.ibb.co/SwLck1N0/Frame-514617361.png", title: "HackCrux'26 Page 10" },
        { url: "https://i.ibb.co/G3G5j85x/Frame-514617371.png", title: "HackCrux'26 Page 11" },
        { url: "https://i.ibb.co/7t05jwKG/Frame-514617364.png", title: "HackCrux'26 Page 12" },
        { url: "https://i.ibb.co/3mjXCF6x/Frame-514617363.png", title: "HackCrux'26 Page 13" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary font-sans selection:bg-brand-accent selection:text-white pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-primary/10 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Print & Editorial
          </button>
          <h1 className="text-xl font-bold tracking-tighter">
            BROCHURE<span className="text-brand-accent">COLLECTION</span>
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Brochures</h2>
          <p className="text-xl text-brand-secondary max-w-2xl">
            A collection of detailed brochures designed for various events and organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <DesignSection {...section} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
