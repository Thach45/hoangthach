import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, LogOut, Globe } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // We don't redirect here if it's the login page, but Next.js handle it if we wrap it right
    // Actually, simple check:
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 flex transition-colors duration-500">
      {session && (
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:flex flex-col p-6 sticky top-0 h-screen">
          <div className="mb-10">
            <h1 className="text-xl font-black gradient-text">Admin Panel</h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Hoang Thach Portfolio</p>
          </div>

          <nav className="space-y-2 flex-1">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link 
              href="/admin/new" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-bold text-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              New Post
            </Link>
          </nav>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <Link 
              href="/blog" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-brand font-bold text-sm transition-all"
            >
              <Globe className="w-4 h-4" />
              View Site
            </Link>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-sm transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>
      )}

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
