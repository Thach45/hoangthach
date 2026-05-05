'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const StarsCanvas = dynamic(() => import('../components/canvas/Stars'), { ssr: false });

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <StarsCanvas />
      
      {/* Back to Home Button (Floating) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-10 left-10 z-50"
      >
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-bold tracking-wider">BACK TO EARTH</span>
        </Link>
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative mb-8"
        >
          <h1 className="text-[150px] md:text-[250px] font-black text-white opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-48 h-48 md:w-64 md:h-64 relative"
             >
                <Image
                  src="/asset/rocket.png"
                  alt="Lost Rocket"
                  fill
                  className="object-contain"
                />
             </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            LOST IN SPACE
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
            Oops! It seems your rocket has drifted too far. This coordinate doesn't exist in our galaxy.
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 bg-brand text-white px-10 py-4 rounded-full text-lg font-bold hover:brightness-110 transition-all transform hover:scale-105 shadow-xl shadow-brand/25"
          >
            <span>RE-ENTRY HOME</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Planets */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 bg-brandCyan/20 rounded-full blur-3xl"
      />
    </div>
  );
}
