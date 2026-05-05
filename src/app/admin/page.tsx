import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getPosts, deletePost } from "@/actions/blog-actions";
import { Plus, Trash2, Edit3, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { posts } = await getPosts(1, 100);

  return (
    <div className="p-8 md:p-12">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black gradient-text">Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Manage your blog articles and AI generation</p>
        </div>
        <Link 
          href="/admin/new"
          className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create Post
        </Link>
      </header>

      <div className="grid gap-6">
        {posts.map((post: any) => (
          <div 
            key={post.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 flex items-center gap-6 group hover:shadow-xl transition-all"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <Image 
                src={post.image} 
                alt="thumb" 
                fill 
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-zinc-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold truncate dark:text-zinc-100">
                {post.title.en}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {post.excerpt.en}
              </p>
            </div>

            <div className="flex items-center gap-2 pr-4">
              <Link 
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
                title="View on site"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
              <button 
                className="p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-zinc-400 hover:text-red-500 transition-colors"
                title="Delete post"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="py-20 text-center bg-white dark:bg-zinc-900 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[40px]">
            <p className="text-zinc-500 font-medium text-lg">No posts yet. Start by creating one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
