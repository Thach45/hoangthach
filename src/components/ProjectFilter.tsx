'use client';

import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectFilterProps {
  onFilterChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onLanguageChange: (language: string) => void;
  onFrameworkChange: (framework: string) => void;
  selectedCategory: string;
  selectedStatus: string;
  selectedLanguage: string;
  selectedFramework: string;
}

export default function ProjectFilter({
  onFilterChange,
  onSearchChange,
  onStatusChange,
  onLanguageChange,
  onFrameworkChange,
  selectedCategory,
  selectedStatus,
  selectedLanguage,
  selectedFramework,
}: ProjectFilterProps) {
  const { isEnglish } = useLanguage();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = [
    { value: 'all', label: isEnglish ? 'All' : 'Tất cả' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
  ];

  const statuses = [
    { value: 'all', label: isEnglish ? 'All Status' : 'Tất cả trạng thái' },
    { value: 'developing', label: isEnglish ? 'Developing' : 'Đang phát triển' },
    { value: 'completed', label: isEnglish ? 'Completed' : 'Hoàn thành' },
  ];

  const languages = [
    { value: 'all', label: isEnglish ? 'All Languages' : 'Tất cả ngôn ngữ' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ];

  const frameworks = [
    { value: 'all', label: isEnglish ? 'All Frameworks' : 'Tất cả framework' },
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring', label: 'Spring Boot' },
  ];

  const FilterButton = ({ 
    isSelected, 
    onClick, 
    children 
  }: { 
    isSelected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isSelected
          ? 'bg-brand-gradient text-white shadow-lg'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder={isEnglish ? 'Search projects...' : 'Tìm kiếm dự án...'}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
        />
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
        >
          {isEnglish ? 'Filters' : 'Bộ lọc'}
        </button>
      </div>

      {/* Filter Groups */}
      <motion.div
        initial={false}
        animate={{
          height: isFiltersOpen ? 'auto' : 0,
          opacity: isFiltersOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-4 py-4">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <FilterButton
                key={category.value}
                isSelected={selectedCategory === category.value}
                onClick={() => onFilterChange(category.value)}
              >
                {category.label}
              </FilterButton>
            ))}
          </div>

          {/* Statuses */}
          <div className="flex flex-wrap justify-center gap-2">
            {statuses.map((status) => (
              <FilterButton
                key={status.value}
                isSelected={selectedStatus === status.value}
                onClick={() => onStatusChange(status.value)}
              >
                {status.label}
              </FilterButton>
            ))}
          </div>

          {/* Languages */}
          <div className="flex flex-wrap justify-center gap-2">
            {languages.map((language) => (
              <FilterButton
                key={language.value}
                isSelected={selectedLanguage === language.value}
                onClick={() => onLanguageChange(language.value)}
              >
                {language.label}
              </FilterButton>
            ))}
          </div>

          {/* Frameworks */}
          <div className="flex flex-wrap justify-center gap-2">
            {frameworks.map((framework) => (
              <FilterButton
                key={framework.value}
                isSelected={selectedFramework === framework.value}
                onClick={() => onFrameworkChange(framework.value)}
              >
                {framework.label}
              </FilterButton>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}