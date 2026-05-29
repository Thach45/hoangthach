import { getQuizById } from '@/actions/quiz';
import QuizEngine from '@/components/QuizEngine';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const quiz = await getQuizById(params.id);
  if (!quiz) return { title: 'Quiz Not Found' };
  
  return {
    title: `${quiz.title} | IT English Quiz`,
  };
}

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuizById(params.id);

  if (!quiz) {
    notFound();
  }

  // Ensure JSON mapping works correctly for options
  const formattedQuestions = quiz.questions.map(q => ({
    ...q,
    // options comes back as JsonValue from Prisma, which is essentially any. 
    // We cast it to expected array of {id, text} safely
    options: Array.isArray(q.options) ? q.options as { id: string, text: string }[] : []
  }));

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12">
          <Link href="/quiz" className="inline-flex items-center text-gray-500 hover:text-brand dark:hover:text-brandCyan mb-6 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back to Quizzes
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-2 dark:text-white">{quiz.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Topic: <span className="font-semibold text-brand dark:text-brandCyan">{quiz.topic}</span>
          </p>
        </div>

        <QuizEngine questions={formattedQuestions} />
      </div>
    </div>
  );
}
