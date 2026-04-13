import React from 'react';
import { motion } from 'motion/react';

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-brand-primary/10 border-t-brand-accent rounded-full"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-4 border-brand-primary/10 border-b-brand-accent rounded-full"
        />
        
        {/* Center Logo/Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(255,51,102,0.5)]"
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-xs font-bold uppercase tracking-[0.4em] text-brand-primary/40">
          Loading
        </span>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 h-1 bg-brand-accent rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
