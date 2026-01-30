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

      <div className="relative md:pl-12">
        {/* Pin / dot */}
        <div className="absolute left-0 top-6 hidden md:flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-brand/30 shadow-sm flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${imprint.highlight ? 'bg-brand' : 'bg-brandCyan'}`} />
          </div>
        </div>

        {/* Paper */}
        <motion.div
          whileHover={{ y: -6, rotate: rotate * 0.25 }}
          transition={{ duration: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/80 shadow-md"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {/* Paper texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.09] dark:opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(177,153,219,0.55)_0%,transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.45)_0%,transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0px,transparent_22px,rgba(0,0,0,0.06)_23px)] bg-[length:100%_24px]" />
          </div>

          {/* Tape corners */}
          <div className="pointer-events-none absolute -top-3 left-6 h-8 w-16 rotate-[-8deg] bg-brand/20 dark:bg-brand/15 blur-[0.2px]" />
          <div className="pointer-events-none absolute -top-2 right-6 h-8 w-14 rotate-[10deg] bg-brandCyan/15 dark:bg-brandCyan/10 blur-[0.2px]" />

          <div className="relative p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wide text-brand dark:text-brand">
                    {imprint.year}
                  </span>
                  {imprint.highlight && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand/10 text-brand dark:text-brand border border-brand/20">
                      {isEnglish ? 'Highlight' : 'Nổi bật'}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                  {isEnglish ? imprint.title.en : imprint.title.vi}
                </h3>

                {imprint.org && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {isEnglish ? imprint.org.en : imprint.org.vi}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
              <div className={imprint.image ? 'md:col-span-3' : 'md:col-span-5'}>
            
                  {/* notebook margin + subtle ruled lines */}
                  <pre className="relative pl-6 pr-4 py-4 text-[13px] md:text-sm leading-relaxed font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    <span className="text-brand">{'"""'}</span>
                    {'\n'}
                    {isEnglish ? imprint.memory.en : imprint.memory.vi}
                    {'\n'}
                    <span className="text-brand">{'"""'}</span>
                  </pre>

                  
                
              </div>
              

              {imprint.image && (
                <div className="md:col-span-2">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700/70 shadow-sm">
                    <Image
                      src={imprint.image}
                      alt={isEnglish ? imprint.title.en : imprint.title.vi}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/15" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
                  {isEnglish ? 'Personal journey note' : 'Ghi chú hành trình'}
                </span>
              </div>

              <div className="text-xs font-medium text-brand hover:opacity-90">
                {isEnglish ? 'A memory kept →' : 'Một kỷ niệm được giữ lại →'}
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

        {variant === 'preview' && (
          <div className="mt-12 text-center">
            <Link
              href="/dau-an-ca-nhan"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-gray-700/70 text-brand rounded-full hover:brightness-105 transition-all"
            >
              {isEnglish ? 'See all 6 imprints' : 'Xem đủ 6 dấu ấn'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

