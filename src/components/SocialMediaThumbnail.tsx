import { motion } from 'motion/react';

export default function SocialMediaThumbnail() {
  return (
    <div className="w-full h-full relative bg-brand-primary/5 overflow-hidden">
      {/* Collage of Social Media Posts */}
      <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105">
        {/* Marble Mandir Post */}
        <motion.div 
          initial={{ rotate: -8, x: -15, y: -10 }}
          whileHover={{ rotate: -5, x: -5, y: -5 }}
          className="absolute top-[10%] left-[5%] w-[60%] aspect-square shadow-2xl rounded-xl overflow-hidden z-10 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/SXKjZSvz/Marble-Mandir-Instagram-Posts.png" 
            className="w-full h-full object-cover" 
            alt="Marble Mandir" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>

        {/* BGMI Poster */}
        <motion.div 
          initial={{ rotate: 12, x: 20, y: 15 }}
          whileHover={{ rotate: 8, x: 10, y: 10 }}
          className="absolute top-[15%] right-[5%] w-[60%] aspect-square shadow-2xl rounded-xl overflow-hidden z-20 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/4DnDLk2/BGMI-poster-2.png" 
            className="w-full h-full object-cover" 
            alt="BGMI Poster" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>

        {/* Art Work Post */}
        <motion.div 
          initial={{ rotate: -4, y: 30 }}
          whileHover={{ rotate: 0, y: 20 }}
          className="absolute bottom-[5%] left-[20%] w-[60%] aspect-square shadow-2xl rounded-xl overflow-hidden z-15 border border-white/10"
        >
          <img 
            src="https://i.ibb.co/F4J3S1Vn/Instagram-post-final.png" 
            className="w-full h-full object-cover" 
            alt="Art Work" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </div>
  );
}
