"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Tag, ChevronRight, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPostBySlug } from '@/actions/blog-actions';

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const { isEnglish } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const dbPost = await getPostBySlug(params.slug);
      setPost(dbPost);
      setLoading(false);
    }
    loadPost();
  }, [params.slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!post) {
    notFound();
  }

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-3xl font-bold mt-12 mb-6 tracking-tight">
            {isEnglish ? section.data.en : section.data.vi}
          </h2>
        );
      case 'paragraph':
        return (
          <p key={index} className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6">
            {isEnglish ? section.data.en : section.data.vi}
          </p>
        );
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-brand pl-6 my-10 italic text-xl text-zinc-500 dark:text-zinc-400">
            &quot;{isEnglish ? section.data.en : section.data.vi}&quot;
          </blockquote>
        );
      case 'image':
        return (
          <figure key={index} className="my-12">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src={section.src} 
                alt="article image" 
                fill 
                className="object-cover"
              />
            </div>
            {section.caption && (
              <figcaption className="text-center text-sm text-zinc-400 mt-4">
                {isEnglish ? section.caption.en : section.caption.vi}
              </figcaption>
            )}
          </figure>
        );
      case 'list-box':
        return (
          <div key={index} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl my-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-brand" />
              {isEnglish ? section.title.en : section.title.vi}
            </h3>
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 list-none pl-0">
              {section.items.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-brand mt-1 shrink-0" />
                  <span>{isEnglish ? item.en : item.vi}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'code-block':
        return (
          <div key={index} className="my-10 group relative">
            <div className="absolute -top-3 right-6 bg-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700 z-10">
              {section.language || 'code'}
            </div>
            <pre className="bg-zinc-900 text-zinc-300 p-8 rounded-3xl overflow-x-auto border border-zinc-800 font-mono text-sm leading-relaxed shadow-lg">
              <code>{section.code}</code>
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="pt-32 pb-32 max-w-screen-md mx-auto px-6 relative z-10">
      
      {/* Navigation Top */}
      <nav className="mb-12">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-brand transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {isEnglish ? 'Back to all posts' : 'Quay lại danh sách'}
        </Link>
      </nav>

      {/* Post Header */}
      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-brand px-3 py-1 bg-brand/10 rounded-full font-bold uppercase text-[10px]">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime} read</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>{post.likes} likes</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] gradient-text"
        >
          {isEnglish ? post.title.en : post.title.vi}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12"
        >
          {isEnglish ? post.excerpt.en : post.excerpt.vi}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl"
        >
          <Image 
            src={post.image} 
            alt="featured" 
            fill 
            className="object-cover"
            priority
          />
        </motion.div>
      </header>

      {/* Content Body Rendering Dynamic Sections */}
      <article className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-lg prose-p:leading-relaxed">
        {post.content?.map((section: any, index: number) => renderSection(section, index))}
      </article>

      {/* Footer Navigation */}
      <footer className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-400">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-gradient" />
          <div>
            <p className="font-bold text-zinc-900 dark:text-white">Nguyen Hoang Thach</p>
            <p>Backend Developer & Tech Writer</p>
          </div>
        </div>
        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-brand transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand transition-colors">GitHub</a>
          <a href="#" className="hover:text-brand transition-colors">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
