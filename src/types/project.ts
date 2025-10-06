export interface Project {
  id: string;
  title: string;
  image: string;
  description: {
    en: string;
    vi: string;
  };
  tech: string[];
  techStack: string;
  link: string;
  github?: string;
  demoVideo?: string;
  status: {
    en: string;
    vi: string;
  };
  startDate: string;
  endDate?: string;
  category: 'frontend' | 'backend' | 'fullstack';
  languages: string[];
  frameworks: string[];
  metrics: {
    commits: number;
    pullRequests: number;
    issues: number;
    timeSpent: number; // in hours
  };
  challenges: {
    en: string[];
    vi: string[];
  };
  solutions: {
    en: string[];
    vi: string[];
  };
}