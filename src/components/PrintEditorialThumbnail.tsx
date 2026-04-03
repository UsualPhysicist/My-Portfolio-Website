import { motion } from 'motion/react';

export default function PrintEditorialThumbnail() {
  return (
    <div className="w-full h-full relative bg-brand-primary/5 overflow-hidden">
      {/* Collage of Print & Editorial Designs - Fan Layout */}
      <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105">
        {/* GDG Standee - Left Fan */}
        <motion.div 
          initial={{ rotate: -15, x: -60, y: 10 }}
          whileHover={{ rotate: -10, x: -40, y: 5 }}
          className="absolute top-[10%] left-[20%] w-[45%] h-[80%] shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/k2fYdvCG/GDG-Standee.png" 
            className="w-full h-full object-cover" 
            alt="GDG Standee" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>

        {/* Road Safety Workshop Standee - Right Fan */}
        <motion.div 
          initial={{ rotate: 15, x: 60, y: 10 }}
          whileHover={{ rotate: 10, x: 40, y: 5 }}
          className="absolute top-[10%] right-[20%] w-[45%] h-[80%] shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/rRSrk6N0/Road-Safety-Workshop-Standee.png" 
            className="w-full h-full object-cover" 
            alt="Road Safety Standee" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>

        {/* Plinth'26 Brochure Front - Center Piece */}
        <motion.div 
          initial={{ rotate: 0, y: 20 }}
          whileHover={{ scale: 1.05, y: 10 }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[50%] aspect-[3/4] shadow-2xl rounded-xl overflow-hidden z-20 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/9m2nPMjs/page-1.png" 
            className="w-full h-full object-cover" 
            alt="Plinth'26 Brochure" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  );
}
