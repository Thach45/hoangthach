import { getRecentQuizzes } from '@/actions/quiz';
import Link from 'next/link';

export const metadata = {
  title: 'IT English Quiz | Thach Hoang',
  description: 'Practice English vocabulary and concepts for tech interviews and system design.',
};

export const dynamic = 'force-dynamic';

export default async function QuizHub() {
  const quizzes = await getRecentQuizzes();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-6 border border-zinc-200 dark:border-zinc-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
            </span>
            Daily AI Quizzes
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Luyện Tập Tiếng Anh IT
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Bộ câu hỏi trắc nghiệm tiếng Anh chuyên ngành được AI tạo mới mỗi ngày. 
            Củng cố từ vựng về Software Architecture, Algorithms, DevOps và hơn thế nữa.
          </p>
        </div>

        {/* Content Section */}
        {quizzes.length === 0 ? (
          <div className="p-16 text-center border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/50 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">Chưa có dữ liệu</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Hệ thống AI đang tiến hành tạo bộ câu hỏi đầu tiên. Vui lòng quay lại sau!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link 
                key={quiz.id} 
                href={`/quiz/${quiz.id}`}
                className="group flex flex-col p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-xl hover:shadow-zinc-200/30 dark:hover:shadow-none transition-all duration-300"
              >
                <div className="mb-5">
                  <span className="inline-flex px-3.5 py-1.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-200 dark:group-hover:text-zinc-900 transition-colors">
                    {quiz.topic}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                  {quiz.title}
                </h3>
                <div className="mt-auto pt-5 flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-500">
                  <span className="font-mono text-xs tracking-wider">
                    {new Date(quiz.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit', month: '2-digit', year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                    Luyện tập
                    <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
