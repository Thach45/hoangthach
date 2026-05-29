'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  content: string;
  options: Option[];
  correctOption: string;
  explanation?: string | null;
};

interface QuizEngineProps {
  questions: Question[];
}

export default function QuizEngine({ questions }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Không tìm thấy câu hỏi nào.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const hasSelected = selectedOptionId !== null;
  const isCorrect = selectedOptionId === currentQuestion.correctOption;

  const handleSelect = (id: string) => {
    if (hasSelected) return;
    setSelectedOptionId(id);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto font-sans">
      
      {/* Progress Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Câu hỏi {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gray-900 dark:bg-gray-100 rounded-full"
          />
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-8">
            {currentQuestion.content}
          </h2>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => {
              // Minimal linear styling
              let buttonStyle = "border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-300 text-gray-700 dark:text-gray-300 bg-transparent";
              let indicatorStyle = "text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-800 group-hover:border-gray-900 dark:group-hover:border-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-300";
              
              if (hasSelected) {
                if (opt.id === currentQuestion.correctOption) {
                  // Correct option
                  buttonStyle = "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-400";
                  indicatorStyle = "border-green-500 text-green-600 dark:text-green-400";
                } else if (opt.id === selectedOptionId) {
                  // Incorrect selected option
                  buttonStyle = "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-400";
                  indicatorStyle = "border-red-500 text-red-600 dark:text-red-400";
                } else {
                  // Unselected options
                  buttonStyle = "border-gray-100 dark:border-gray-800/50 text-gray-400 dark:text-gray-600 bg-transparent opacity-60 pointer-events-none";
                  indicatorStyle = "border-gray-100 dark:border-gray-800/50 text-gray-400 dark:text-gray-600";
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={hasSelected}
                  className={`group w-full text-left p-4 rounded-xl border transition-colors duration-200 flex items-center gap-4 outline-none ${buttonStyle}`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 flex-shrink-0 border ${indicatorStyle}`}>
                    {opt.id}
                  </span>
                  <span className="text-base leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Section */}
          <AnimatePresence>
            {hasSelected && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className={`text-lg font-medium mb-2 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isCorrect ? 'Chính xác' : `Sai. Đáp án đúng là ${currentQuestion.correctOption}`}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      Tiếp tục
                    </button>
                  ) : (
                    <div className="w-full text-center py-12">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Đã hoàn thành bộ đề</h3>
                      <p className="text-gray-500">Bạn đã trả lời tất cả các câu hỏi.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

