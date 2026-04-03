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
}

const DesignSection = ({ title, images }: DesignSectionProps) => {
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
          className="aspect-[16/9] relative overflow-hidden cursor-zoom-in"
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
            Explore my latest {title.toLowerCase()} projects. {isManualMode ? "Manual navigation enabled." : "Hover to auto-play, click to zoom."}
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
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

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <h4 className="text-white text-xl font-bold mb-1">{images[currentIndex].title}</h4>
              <p className="text-white/50 text-sm uppercase tracking-widest">{title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface ProductDesignPageProps {
  onBack: () => void;
}

export default function ProductDesignPage({ onBack }: ProductDesignPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Merch Designs",
      images: [
        { url: "https://i.ibb.co/wN2LsC4H/Drummer-back.png", title: "Drummer Back" },
        { url: "https://i.ibb.co/XkWd0SRN/Guitarist-back.png", title: "Guitarist Back" },
        { url: "https://i.ibb.co/d47ZH801/Pianist-back.png", title: "Pianist Back" },
        { url: "https://i.ibb.co/jkVnKMr1/Tabla-back.png", title: "Tabla Back" },
        { url: "https://i.ibb.co/MJ6cLrJ/Violinst-back.png", title: "Violinist Back" },
        { url: "https://i.ibb.co/kgKZ64Jz/Vocalist-back.png", title: "Vocalist Back" },
        { url: "https://i.ibb.co/fVMxz78J/GDSC-Back1.png", title: "GDSC Merch Back" },
        { url: "https://i.ibb.co/rGFC7LdF/merch-back.png", title: "HackCrux V2 Merch Back" },
        { url: "https://i.ibb.co/mVft1Btq/merch-front.png", title: "HackCrux V2 Merch Front" },
        { url: "https://i.ibb.co/BVvRd4b6/Plinth-26-Merch-design-black-back.png", title: "Plinth'26 Merch Back" },
        { url: "https://i.ibb.co/Kp7BQ3mY/Winter-merch-GDG.png", title: "Winter Merch GDG" },
      ]
    },
    {
      title: "ID card designs",
      images: [
        { url: "https://i.ibb.co/Lzw5N8vz/Hackcrux-V2-id-card-design.png", title: "HackCrux V2 ID card design" },
        { url: "https://i.ibb.co/NdHDR1GF/Organizing-Committee.png", title: "Plinth'26 Organizing Committee ID card" },
        { url: "https://i.ibb.co/0Rdy7yfD/Coverage-Team.png", title: "Plinth'26 Coverage Team ID card" },
        { url: "https://i.ibb.co/JjYFwv6H/Full-Access.png", title: "Plinth'26 Full Access Team ID card" },
        { url: "https://i.ibb.co/XZ93bRdS/Plinth-26-face-id-design.png", title: "Plinth'26 Face ID card design" },
        { url: "https://i.ibb.co/JRVt6sFG/strap.png", title: "Plinth'26 ID card strap" },
      ]
    },
    {
      title: "Logo Designs",
      images: [
        { url: "https://i.ibb.co/V1dt0vn/color-draft-temp-44.jpg", title: "Logo Draft 1" },
        { url: "https://i.ibb.co/6cLjYjWG/color-temp-draft-19.jpg", title: "Logo Draft 2" },
        { url: "https://i.ibb.co/xtKdhFzZ/color-temp-draft-20.jpg", title: "Logo Draft 3" },
        { url: "https://i.ibb.co/1YSdq8nr/color-temp-draft-21.jpg", title: "Logo Draft 4" },
        { url: "https://i.ibb.co/4rJjVvG/color-temp-draft-23.jpg", title: "Logo Draft 5" },
        { url: "https://i.ibb.co/Hf4Lxwq2/color-temp-draft-33.jpg", title: "Logo Draft 6" },
        { url: "https://i.ibb.co/39VDqMqn/draft-temp-13.jpg", title: "Logo Draft 7" },
        { url: "https://i.ibb.co/HLs80d2v/draft-temp-14.jpg", title: "Logo Draft 8" },
        { url: "https://i.ibb.co/NdjYbj6m/draft-temp-15.jpg", title: "Logo Draft 9" },
        { url: "https://i.ibb.co/8gCKMb1C/draft-temp-16.jpg", title: "Logo Draft 10" },
        { url: "https://i.ibb.co/N6pRKVt0/draft-temp-17.jpg", title: "Logo Draft 11" },
        { url: "https://i.ibb.co/7dKfyBS6/draft-temp-18.jpg", title: "Logo Draft 12" },
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
            Back to Home
          </button>
          <h1 className="text-xl font-bold tracking-tighter">
            PRODUCT<span className="text-brand-accent">DESIGN</span>
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Creative Explorations</h2>
          <p className="text-xl text-brand-secondary max-w-2xl">
            A deep dive into my product design process, featuring merchandise, identity systems, and brand marks.
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
