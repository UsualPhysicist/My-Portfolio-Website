import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Maximize2, X, ArrowUpRight } from 'lucide-react';
import BrochuresPage from './BrochuresPage';

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

const TiltedThumbnail = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-3xl bg-brand-card border border-brand-primary/10 shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer"
    >
      <div className="aspect-[4/3] relative bg-brand-primary/5 overflow-hidden">
        {/* Collage of uploaded designs - Filling the area with Product Design vibe */}
        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105">
          <motion.div 
            initial={{ rotate: -12, x: -20, y: -20 }}
            whileHover={{ rotate: -8, x: -10, y: -10 }}
            className="absolute top-0 left-0 w-[65%] h-[85%] shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10"
          >
            <img src="https://i.ibb.co/twmcYgJM/Frame-514617359.png" className="w-full h-full object-cover" alt="HackCrux'26" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            initial={{ rotate: 8, x: 20, y: 20 }}
            whileHover={{ rotate: 5, x: 10, y: 10 }}
            className="absolute top-[10%] right-0 w-[65%] h-[85%] shadow-2xl rounded-xl overflow-hidden z-20 border border-white/10"
          >
            <img src="https://i.ibb.co/9m2nPMjs/page-1.png" className="w-full h-full object-cover" alt="Plinth'26" referrerPolicy="no-referrer" />
          </motion.div>
          <motion.div 
            initial={{ rotate: -5, y: 40 }}
            whileHover={{ rotate: 0, y: 30 }}
            className="absolute bottom-0 left-[15%] w-[65%] h-[85%] shadow-2xl rounded-xl overflow-hidden z-15 border border-white/10"
          >
            <img src="https://i.ibb.co/hF4VhVMn/Frame-18.png" className="w-full h-full object-cover" alt="Plinth'25 PR" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px] z-30">
          <span className="px-8 py-4 bg-brand-bg text-brand-primary rounded-full font-bold shadow-xl flex items-center gap-2">
            View Collection <ArrowUpRight size={20} />
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold group-hover:text-brand-accent transition-colors">Brochure Collection</h3>
          <ArrowUpRight className="text-brand-secondary group-hover:text-brand-accent transition-colors" />
        </div>
        <p className="text-brand-secondary">
          Explore our complete range of event and corporate brochures. Click to view details.
        </p>
      </div>
    </motion.div>
  );
};

interface PrintEditorialPageProps {
  onBack: () => void;
}

export default function PrintEditorialPage({ onBack }: PrintEditorialPageProps) {
  const [brochuresView, setBrochuresView] = useState(false);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Banners/Standees",
      images: [
        { url: "https://i.ibb.co/zVCpSb04/BANNER-ANWITA.png", title: "BANNER ANWITA" },
        { url: "https://i.ibb.co/WNM6gz6w/BANNER-DEEPANSHU.png", title: "BANNER DEEPANSHU" },
        { url: "https://i.ibb.co/XxzBJwq1/BANNER-DEVANSH.png", title: "BANNER DEVANSH" },
        { url: "https://i.ibb.co/4w50Y307/BANNER-PARTH.png", title: "BANNER PARTH" },
        { url: "https://i.ibb.co/k2fYdvCG/GDG-Standee.png", title: "GDG Standee" },
        { url: "https://i.ibb.co/PGvJW824/Hack-Crux-V2-banner.png", title: "Hack Crux V2 banner" },
        { url: "https://i.ibb.co/SX2WHvL8/Hackcrux-V2-Standee.png", title: "Hackcrux V2 Standee" },
        { url: "https://i.ibb.co/8L7W1hLT/help-desk-banner.png", title: "help desk banner" },
        { url: "https://i.ibb.co/PzMHcthY/help-desk-banner2.png", title: "help desk banner2" },
        { url: "https://i.ibb.co/rRSrk6N0/Road-Safety-Workshop-Standee.png", title: "Road Safety Workshop Standee" },
      ]
    }
  ];

  if (brochuresView) {
    return <BrochuresPage onBack={() => {
      setBrochuresView(false);
      setTimeout(() => {
        window.scrollTo(0, scrollPosRef.current);
      }, 0);
    }} />;
  }

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
            PRINT<span className="text-brand-accent">&</span>EDITORIAL
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
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Print & Editorial</h2>
          <p className="text-xl text-brand-secondary max-w-2xl">
            Compelling and polished layouts for physical marketing materials, from brochures to large-scale banners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {/* Brochures Section with Tilted Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TiltedThumbnail onClick={() => {
              scrollPosRef.current = window.scrollY;
              setBrochuresView(true);
            }} />
          </motion.div>

          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
            >
              <DesignSection {...section} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
