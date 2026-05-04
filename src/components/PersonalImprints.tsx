'use client';

import { personalImprints } from '@/data/imprints';
import { useLanguage } from '@/context/LanguageContext';
import { Imprint } from '@/types/imprint';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef } from 'react';

type PersonalImprintsVariant = 'preview' | 'page';

function getRotationByIndex(index: number) {
  const rotations = [-2.5, 1.5, -1, 2, -1.75, 1.25];
  return rotations[index % rotations.length];
}

function PaperCard({ imprint, index }: { imprint: Imprint; index: number }) {
  const { isEnglish } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });
  const rotate = getRotationByIndex(index);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-4 top-0 bottom-0 hidden md:block">
        <div className="w-px h-full bg-gradient-to-b from-brand/30 via-brandCyan/20 to-transparent" />
      </div>

      <div className={`relative md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        {/* Pin / dot */}
        <div className={`absolute top-6 hidden md:flex items-center justify-center ${index % 2 === 0 ? '-right-4' : '-left-4'}`}>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-brand shadow-lg flex items-center justify-center z-20">
            <div className={`w-3 h-3 rounded-full ${imprint.highlight ? 'bg-brand animate-pulse' : 'bg-brandCyan'}`} />
          </div>
        </div>

        {/* Paper */}
        <motion.div
          whileHover={{ y: -10, rotate: 0, scale: 1.02, zIndex: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-900 shadow-xl cursor-pointer group ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-4xl`}
          style={{ rotate: `${rotate}deg` }}
        >
          {/* Paper texture & Ruled lines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.1] dark:opacity-[0.08]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(177,153,219,0.2)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0px,transparent_23px,rgba(0,0,0,0.1)_24px)] bg-[length:100%_25px]" />
          </div>

          {/* Realistic Tape Corners */}
          <div className="pointer-events-none absolute -top-4 left-1/4 h-10 w-24 rotate-[-5deg] bg-brand/10 dark:bg-brand/20 backdrop-blur-[1px] border-x border-brand/5" 
               style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }} />
          <div className="pointer-events-none absolute -bottom-4 right-1/4 h-10 w-24 rotate-[3deg] bg-brandCyan/10 dark:bg-brandCyan/20 backdrop-blur-[1px] border-x border-brandCyan/5"
               style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }} />

          <div className="relative p-8">
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} gap-2`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-brand tracking-widest uppercase">
                  {imprint.year}
                </span>
                {imprint.highlight && (
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-brand text-white shadow-sm uppercase tracking-tighter">
                    {isEnglish ? 'Special' : 'Đặc biệt'}
                  </span>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mt-2">
                {isEnglish ? imprint.title.en : imprint.title.vi}
              </h3>

              {imprint.org && (
                <p className="text-brand font-medium italic opacity-80">
                  @ {isEnglish ? imprint.org.en : imprint.org.vi}
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className={`lg:col-span-7 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative">
                   {/* Handwritten style memory */}
                  <div className="relative p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg border-l-4 border-brand italic font-serif text-lg leading-relaxed text-gray-700 dark:text-gray-300 shadow-inner">
                    <span className="absolute -top-4 -left-2 text-6xl text-brand/20 font-serif">"</span>
                    {isEnglish ? imprint.memory.en : imprint.memory.vi}
                    <span className="absolute -bottom-10 -right-2 text-6xl text-brand/20 font-serif">"</span>
                  </div>
                </div>
              </div>

              {imprint.image && (
                <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative aspect-[4/3] rounded-sm p-2 bg-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 border border-gray-100">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={imprint.image}
                        alt={isEnglish ? imprint.title.en : imprint.title.vi}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`mt-10 flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="px-4 py-2 bg-brand/5 dark:bg-brand/10 border border-brand/20 rounded-md text-[11px] font-bold text-brand uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
                 {isEnglish ? 'Authenticated Memory' : 'Dấu ấn xác thực'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PersonalImprints({ variant = 'preview' }: { variant?: PersonalImprintsVariant }) {
  const { isEnglish } = useLanguage();

  const items = useMemo(() => {
    const sorted = [...personalImprints].sort((a, b) => Number(b.year) - Number(a.year));
    return variant === 'preview' ? sorted.slice(0, 3) : sorted;
  }, [variant]);

  return (
    <section id="imprints" className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Background doodles */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.6]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brandCyan/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
          {isEnglish ? 'Personal Imprints' : 'Dấu ấn cá nhân'}
        </h2>

        {
          variant === "page" && (
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {isEnglish
            ? 'A scrapbook-like timeline of awards and milestones — each one a memory that shaped my path.'
            : 'Một timeline dạng scrapbook về giải thưởng và cột mốc — mỗi dấu ấn là một kỷ niệm góp phần tạo nên hành trình của mình.'}
        </p>
          )
        }

        {variant === 'page' && (
          
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/70 text-gray-900 dark:text-gray-100 rounded-full hover:brightness-105 transition-all"
            >
              {isEnglish ? 'Back to home' : 'Về trang chủ'}
            </Link>
          </div>
        )}
      

        <div className="mt-12 grid grid-cols-1 gap-8">
          {items.filter((imprint) => imprint.highlight).map((imprint, index) => (
            
            <PaperCard key={imprint.id} imprint={imprint} index={index} />
          ))}
        </div>

       
      </div>
    </section>
  );
}

