"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Zap, Sun, Moon, Heart } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { getPosts } from "@/actions/blog-actions";
import { useEffect } from 'react';

export default function BlogPage() {
  const { isEnglish, setIsEnglish } = useLanguage() as any;
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Technology', 'Backend', 'AI & ML', 'Algorithms', 'Programming Languages', 'System Design', 'Database', 'Career', 'Vibe Code', 'News'];

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const result = await getPosts(currentPage, 7, activeCategory, searchQuery);
      setPosts(result.posts);
      setTotalPages(result.totalPages);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    loadPosts();
  }, [currentPage, activeCategory, searchQuery]);

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <main className="pt-32 pb-32 max-w-screen-xl mx-auto px-6 relative z-10">
        
        {/* NEW HEADER: Centered & Balanced */}
        <header className="py-16 md:py-24 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            {isEnglish ? 'Welcome to my digital garden' : 'Chào mừng đến với không gian của mình'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 gradient-text"
          >
            {isEnglish ? 'Explore my ' : 'Khám phá '}<span className="text-zinc-400 dark:text-zinc-600">{isEnglish ? 'thoughts.' : 'góc nhìn.'}</span>
          </motion.h1>
        
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 font-light max-w-2xl leading-relaxed"
          >
            {isEnglish 
              ? "A collection of ideas, technical deep dives, and thoughts on software engineering, AI, and digital craft." 
              : "Tập hợp những ý tưởng, kỹ thuật chuyên sâu và suy nghĩ về công nghệ phần mềm, AI và sáng tạo số."}
          </motion.p>
        </header>

        {/* Filter & Search Bar: Grouped nicely */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-6 border-b border-zinc-200/70"
        >
          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/10 dark:shadow-zinc-50/5' 
                    : 'bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder={isEnglish ? "Search articles..." : "Tìm bài viết..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-zinc-100/50 dark:bg-white/5 border border-transparent dark:border-zinc-800 rounded-full focus:outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-300 dark:focus:border-zinc-700 focus:ring-4 focus:ring-zinc-100 dark:focus:ring-white/5 transition-all text-sm placeholder:text-zinc-400"
            />
          </div>
        </motion.div>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-20 text-center text-zinc-500">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="space-y-24">
            
            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.article 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                >
                  <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={featuredPost.image}
                      alt={isEnglish ? featuredPost.title.en : featuredPost.title.vi}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6 text-sm font-medium text-zinc-500">
                      <span className="text-brand px-3 py-1 bg-brand/10 rounded-full font-bold uppercase text-[10px]">{featuredPost.category}</span>
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> {featuredPost.likes}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.15] hover:text-brand dark:text-zinc-100 transition-colors">
                      {isEnglish ? featuredPost.title.en : featuredPost.title.vi}
                    </h2>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-xl">
                      {isEnglish ? featuredPost.excerpt.en : featuredPost.excerpt.vi}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase text-zinc-900 dark:text-zinc-100 hover:text-brand transition-colors">
                      {isEnglish ? 'Read Article' : 'Đọc bài viết'}
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            )}

            {/* Grid Posts */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                <AnimatePresence mode='popLayout'>
                  {gridPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <motion.article
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group cursor-pointer flex flex-col h-full"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 mb-6">
                          <img
                            src={post.image}
                            alt={isEnglish ? post.title.en : post.title.vi}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase">
                          <span className="text-brand">{post.category}</span>
                          <span className="text-zinc-400">•</span>
                          <span className="text-zinc-400">{post.date}</span>
                          <span className="text-zinc-400 ml-auto flex items-center gap-1 text-[9px]"><Heart className="w-3 h-3 fill-zinc-400 text-zinc-400" /> {post.likes}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 leading-snug hover:text-brand dark:text-zinc-100 transition-colors">
                          {isEnglish ? post.title.en : post.title.vi}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {isEnglish ? post.excerpt.en : post.excerpt.vi}
                        </p>
                      </motion.article>
                    </Link>
                  ))}
                </AnimatePresence>
              </div>
            )}
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-bold disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                >
                  {isEnglish ? 'Previous' : 'Trước'}
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                        currentPage === i + 1 
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' 
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-6 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-bold disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                >
                  {isEnglish ? 'Next' : 'Tiếp'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="py-32 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-zinc-100">Nothing found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">We couldn't find any articles matching your search.</p>
          </div>
        )}

      </main>
  );
}