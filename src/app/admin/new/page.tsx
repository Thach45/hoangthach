"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Save, ArrowLeft, Image as ImageIcon, Type, Layout } from "lucide-react";
import { handleAiGeneration } from "../actions";
import { createPost } from "@/actions/blog-actions";
import toast from "react-hot-toast";
import Link from "next/link";

export default function NewPostPage() {
  const [topic, setTopic] = useState("");
  const [formData, setFormData] = useState<any>({
    title: { en: "", vi: "" },
    excerpt: { en: "", vi: "" },
    category: "Technology",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    content: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const onGenerate = async () => {
    if (!topic) return toast.error("Please enter a topic first!");
    
    setIsGenerating(true);
    const aiData = await handleAiGeneration(topic);
    setIsGenerating(false);

    if (aiData) {
      setFormData({
        ...formData,
        ...aiData
      });
      toast.success("Content filled! You can now review and save.");
    }
  };

  const onSave = async () => {
    if (!formData.title.en) return toast.error("Please fill or generate content first!");
    setIsSaving(true);
    
    const result = await createPost(formData);
    if (result.success) {
      toast.success("Post published successfully!");
      router.push("/admin");
    } else {
      toast.error(result.error || "Failed to save post");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-brand/10 text-brand px-6 py-3 rounded-2xl font-bold hover:bg-brand/20 transition-all border border-brand/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? "Gemini is writing..." : "Generate with Gemini"}
          </button>
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-2xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </header>

      <div className="space-y-8">
        {/* Topic Input */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-brand w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-zinc-100">AI Topic Generator</h2>
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="What should this blog be about? (e.g. Scaling Next.js Apps)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand/30 transition-all"
            />
          </div>
        </section>

        {/* Content Preview / Editor */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Metadata Section */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="text-zinc-400 w-5 h-5" />
              <h2 className="text-xl font-bold dark:text-zinc-100">Basic Info</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase  text-zinc-400 ml-1">Featured Image URL</label>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full mt-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase  text-zinc-400 ml-1">Category</label>
                  <input 
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full mt-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase  text-zinc-400 ml-1">Read Time</label>
                  <input 
                    type="text" 
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    className="w-full mt-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Title Section */}
          <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Type className="text-zinc-400 w-5 h-5" />
              <h2 className="text-xl font-bold dark:text-zinc-100">Titles & Excerpts</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase  text-zinc-400 ml-1">English Title</label>
                <input 
                  type="text" 
                  value={formData.title.en}
                  onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
                  className="w-full mt-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase  text-zinc-400 ml-1">Vietnamese Title</label>
                <input 
                  type="text" 
                  value={formData.title.vi}
                  onChange={(e) => setFormData({...formData, title: {...formData.title, vi: e.target.value}})}
                  className="w-full mt-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold outline-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Content Structure Preview */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[40px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Layout className="text-zinc-400 w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-zinc-100">Content Structure ({formData.content.length} blocks)</h2>
          </div>

          <div className="space-y-4">
            {formData.content.map((section: any, idx: number) => (
              <div key={idx} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase  text-zinc-400">{section.type}</span>
                  <p className="text-sm font-medium dark:text-zinc-300 truncate">
                    {section.data ? section.data.en : section.title ? section.title.en : "Content block"}
                  </p>
                </div>
              </div>
            ))}
            
            {formData.content.length === 0 && (
              <div className="text-center py-12 text-zinc-400 italic">
                No content blocks yet. Use Gemini to generate!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
