'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Play,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { chatWidgetData, learningTimeline, personalInfo, projects, skills } from '@/data/data';
import { MusicTrackSchema, VisitorMessageSchema, type ChatResponse, type ChatWidget, type MusicTrack, type VisitorMessage } from '@/lib/chat';

interface WidgetProps {
  isEnglish: boolean;
  data?: ChatResponse['data'];
  onSendMessage?: (message: string) => void;
  onSelectMusic?: (track: MusicTrack) => void;
  onVisitorWallChange?: (active: boolean, messages?: VisitorMessage[]) => void;
}

function WidgetCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function WidgetProjects({ isEnglish }: WidgetProps) {
  return (
    <div className="mask-edges mt-2 flex w-full gap-3 overflow-x-auto px-1 pb-3 pt-1 custom-scrollbar">
      {projects.map((project, index) => (
        <motion.a
          key={project.id}
          href={project.github || project.link}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06 }}
          className="min-w-[230px] max-w-[230px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
        >
          <div className="relative h-28 bg-gray-100 dark:bg-white/10">
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="p-3">
            <p className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">{project.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{isEnglish ? project.description.en : project.description.vi}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">{isEnglish ? 'Explore' : 'Khám phá'} <ArrowUpRight size={13} /></span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function WidgetSkills({ isEnglish }: WidgetProps) {
  return (
    <WidgetCard className="p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand">{isEnglish ? 'Core skills' : 'Kỹ năng chính'}</p>
      <div className="flex flex-wrap gap-2">
        {skills.categories.slice(0, 2).flatMap((category) => category.items).map((item) => (
          <span key={item.name} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-white/10 dark:text-gray-200">{item.name}</span>
        ))}
      </div>
    </WidgetCard>
  );
}

function WidgetContact({ isEnglish }: WidgetProps) {
  return (
    <WidgetCard className="max-w-sm p-3">
      <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-brand/5">
        <span className="rounded-full bg-brand/10 p-2 text-brand"><Mail size={15} /></span>
        <span className="min-w-0"><span className="block text-xs text-gray-500">Email</span><span className="block truncate text-sm font-medium text-gray-900 dark:text-white">{personalInfo.email}</span></span>
      </a>
      <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-brand/5">
        <span className="rounded-full bg-green-500/10 p-2 text-green-600"><Phone size={15} /></span>
        <span><span className="block text-xs text-gray-500">{isEnglish ? 'Phone' : 'Điện thoại'}</span><span className="block text-sm font-medium text-gray-900 dark:text-white">{personalInfo.phone}</span></span>
      </a>
    </WidgetCard>
  );
}

function WidgetAbout({ isEnglish }: WidgetProps) {
  return (
    <WidgetCard className="max-w-sm bg-gradient-to-br from-brand/10 to-transparent p-4 dark:from-brand/20">
      <div className="flex items-start gap-3">
        <Image src={personalInfo.avatar} alt="Avatar" width={48} height={48} className="rounded-full border-2 border-white object-cover shadow-sm dark:border-gray-800" />
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{isEnglish ? personalInfo.name.en : personalInfo.name.vi}</h3>
          <p className="text-xs font-medium text-brand">{isEnglish ? personalInfo.title.en : personalInfo.title.vi}</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">{isEnglish ? personalInfo.bio.en : personalInfo.bio.vi}</p>
        </div>
      </div>
    </WidgetCard>
  );
}

function WidgetProjectDetail({ isEnglish, data }: WidgetProps) {
  const projectId = typeof data?.projectId === 'string' ? data.projectId : projects[0]?.id;
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  if (!project) return null;

  return (
    <WidgetCard className="max-w-md">
      <div className="relative h-36 bg-gray-100 dark:bg-white/10"><img src={project.image} alt="" className="h-full w-full object-cover" /></div>
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-brand">{isEnglish ? 'Project spotlight' : 'Dự án nổi bật'}</p>
        <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">{isEnglish ? project.description.en : project.description.vi}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{project.tech.slice(0, 5).map((tech) => <span key={tech} className="rounded-md bg-gray-100 px-2 py-1 text-[11px] text-gray-600 dark:bg-white/10 dark:text-gray-300">{tech}</span>)}</div>
        <div className="mt-4 flex gap-2">
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"><Github size={13} /> GitHub</a>}
          {project.link !== '#' && <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-2 text-xs font-semibold text-brand"><ArrowUpRight size={13} /> Demo</a>}
        </div>
      </div>
    </WidgetCard>
  );
}

function WidgetExperience({ isEnglish }: WidgetProps) {
  return (
    <WidgetCard className="max-w-md p-4">
      <div className="mb-3 flex items-center gap-2 text-brand"><GraduationCap size={17} /><span className="text-xs font-bold uppercase tracking-wider">{isEnglish ? 'Learning journey' : 'Hành trình học tập'}</span></div>
      <div className="space-y-4 border-l border-brand/30 pl-4">
        {learningTimeline.map((item) => <div key={item.id} className="relative"><span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-brand" /><p className="text-xs font-semibold text-brand">{item.period}</p><p className="text-sm font-semibold text-gray-900 dark:text-white">{isEnglish ? item.title.en : item.title.vi}</p><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{isEnglish ? item.focus.en : item.focus.vi}</p></div>)}
      </div>
    </WidgetCard>
  );
}

function WidgetTechStack({ isEnglish }: WidgetProps) {
  return (
    <WidgetCard className="max-w-md p-4">
      <div className="mb-3 flex items-center gap-2 text-brand"><Terminal size={16} /><span className="text-xs font-bold uppercase tracking-wider">{isEnglish ? 'Technology stack' : 'Công nghệ sử dụng'}</span></div>
      <div className="space-y-3">{skills.categories.map((category) => <div key={category.title}><p className="mb-1.5 text-xs font-semibold text-gray-900 dark:text-white">{category.title}</p><div className="flex flex-wrap gap-1.5">{category.items.map((item) => <span key={item.name} className="rounded-md bg-gray-100 px-2 py-1 text-[11px] text-gray-600 dark:bg-white/10 dark:text-gray-300">{item.name}</span>)}</div></div>)}</div>
    </WidgetCard>
  );
}

function WidgetCV({ isEnglish }: WidgetProps) {
  const resumes = [
    { href: personalInfo.cv.backend, label: isEnglish ? 'Backend CV' : 'CV Backend', detail: 'Node.js, Java, APIs' },
    { href: personalInfo.cv.fullstack, label: isEnglish ? 'Fullstack CV' : 'CV Fullstack', detail: 'Next.js, AI, product' },
  ];
  return <WidgetCard className="max-w-sm p-3">{resumes.map((resume) => <a key={resume.href} href={resume.href} download className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand/5"><span className="rounded-xl bg-red-500/10 p-2 text-red-500"><FileText size={18} /></span><span className="flex-1"><span className="block text-sm font-semibold text-gray-900 dark:text-white">{resume.label}</span><span className="text-xs text-gray-500">{resume.detail}</span></span><Download size={16} className="text-brand" /></a>)}</WidgetCard>;
}

function WidgetSocialLinks({ isEnglish }: WidgetProps) {
  const links = [
    { href: personalInfo.links.github, label: 'GitHub', icon: Github },
    { href: personalInfo.links.linkedin, label: 'LinkedIn', icon: Linkedin },
  ];
  return <WidgetCard className="max-w-sm p-3"><p className="px-2 pb-2 text-xs text-gray-500">{isEnglish ? 'Find me online' : 'Kết nối với mình'}</p><div className="flex gap-2">{links.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-brand/10 hover:text-brand dark:bg-white/10 dark:text-gray-200"><Icon size={15} />{label}</a>)}</div></WidgetCard>;
}

function WidgetAvailability({ isEnglish, onSendMessage }: WidgetProps) {
  const content = isEnglish ? chatWidgetData.availability.en : chatWidgetData.availability.vi;
  return <WidgetCard className="max-w-sm bg-gradient-to-br from-emerald-500/10 to-transparent p-4"><div className="flex gap-3"><span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" /><div><h3 className="text-sm font-bold text-gray-900 dark:text-white">{content.title}</h3><p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">{content.description}</p><button onClick={() => onSendMessage?.(isEnglish ? 'I would like to get in touch.' : 'Mình muốn liên hệ với bạn.')} className="mt-3 text-xs font-bold text-emerald-600">{content.action} <ArrowUpRight className="inline" size={13} /></button></div></div></WidgetCard>;
}

function WidgetQuickActions({ isEnglish, onSendMessage }: WidgetProps) {
  const actions = [
    { label: isEnglish ? 'View CV' : 'Xem CV', prompt: isEnglish ? 'Show me your CV.' : 'Cho mình xem CV.' },
    { label: isEnglish ? 'Best project' : 'Dự án nổi bật', prompt: isEnglish ? 'Show me your best backend project.' : 'Cho mình xem dự án backend nổi bật nhất.' },
    { label: isEnglish ? 'Contact' : 'Liên hệ', prompt: isEnglish ? 'I want to contact you.' : 'Mình muốn liên hệ với bạn.' },
  ];
  return <WidgetCard className="max-w-sm p-3"><div className="flex items-center gap-2 px-1 pb-2 text-brand"><Sparkles size={15} /><span className="text-xs font-bold uppercase tracking-wider">{isEnglish ? 'What next?' : 'Khám phá tiếp'}</span></div><div className="flex flex-wrap gap-2">{actions.map((action) => <button key={action.label} onClick={() => onSendMessage?.(action.prompt)} className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-brand/10 hover:text-brand dark:bg-white/10 dark:text-gray-200">{action.label}</button>)}</div></WidgetCard>;
}

function WidgetFAQ({ isEnglish, onSendMessage }: WidgetProps) {
  return <WidgetCard className="max-w-md p-3"><p className="px-1 pb-2 text-xs font-bold uppercase tracking-wider text-brand">FAQ</p><div className="flex flex-col gap-1.5">{chatWidgetData.faqs.map((faq) => { const question = isEnglish ? faq.en : faq.vi; return <button key={question} onClick={() => onSendMessage?.(question)} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5 text-left text-xs text-gray-700 transition-colors hover:bg-brand/10 hover:text-brand dark:bg-white/5 dark:text-gray-200"><span>{question}</span><ArrowUpRight size={14} /></button>; })}</div></WidgetCard>;
}

function WidgetFunFact({ isEnglish, data }: WidgetProps) {
  const requestedIndex = typeof data?.index === 'number' ? data.index : Math.floor(Math.random() * chatWidgetData.funFacts.length);
  const fact = chatWidgetData.funFacts[Math.abs(requestedIndex) % chatWidgetData.funFacts.length];
  return <WidgetCard className="max-w-sm bg-gradient-to-br from-pink-500/10 to-orange-400/10 p-4"><div className="flex gap-3"><Sparkles className="shrink-0 text-pink-500" size={19} /><div><p className="text-xs font-bold uppercase tracking-wider text-pink-500">{isEnglish ? 'Fun fact' : 'Fun fact nho nhỏ'}</p><p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-200">{isEnglish ? fact.en : fact.vi}</p></div></div></WidgetCard>;
}

function WidgetGithubStats({ isEnglish }: WidgetProps) {
  return <WidgetCard className="max-w-sm p-4"><div className="mb-3 flex items-center gap-2 text-gray-900 dark:text-white"><Github size={17} /><span className="text-xs font-bold uppercase tracking-wider">{isEnglish ? 'GitHub / Portfolio' : 'GitHub / dự án'}</span></div><div className="grid grid-cols-3 gap-2">{chatWidgetData.githubStats.map((stat) => <div key={stat.value} className="rounded-xl bg-gray-100 p-2 text-center dark:bg-white/10"><p className="text-base font-bold text-brand">{stat.value}</p><p className="mt-1 text-[10px] leading-tight text-gray-500 dark:text-gray-400">{isEnglish ? stat.label.en : stat.label.vi}</p></div>)}</div></WidgetCard>;
}

function WidgetMusic({ isEnglish, data, onSelectMusic }: WidgetProps) {
  const rawTracks = Array.isArray(data?.tracks) ? data.tracks : [];
  const tracks = rawTracks.map((track) => MusicTrackSchema.safeParse(track)).filter((result) => result.success).map((result) => result.data);
  if (!tracks.length) return null;
  return <div className="mask-edges mt-2 flex w-full gap-3 overflow-x-auto px-1 pb-3 custom-scrollbar">{tracks.map((track) => <button key={`${track.title}-${track.artist}`} onClick={() => onSelectMusic?.(track)} className="flex min-w-[210px] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"><img src={track.artwork || '/asset/anh3.png'} alt="" className="h-11 w-11 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">{track.title}</span><span className="block truncate text-xs text-gray-500">{track.artist}</span></span><span className="rounded-full bg-brand p-2 text-white"><Play size={12} fill="currentColor" /></span></button>)}</div>;
}

function WidgetVisitorMessages({ isEnglish, onVisitorWallChange }: WidgetProps) {
  const [messages, setMessages] = useState<VisitorMessage[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    onVisitorWallChange?.(true);
    fetch('/api/visitor-messages')
      .then((response) => response.json())
      .then((data) => {
        const parsed: VisitorMessage[] = [];
        if (Array.isArray(data.messages)) {
          for (const message of data.messages) {
            const result = VisitorMessageSchema.safeParse(message);
            if (result.success) parsed.push(result.data);
          }
        }
        if (active) {
          setMessages(parsed);
          onVisitorWallChange?.(true, parsed);
        }
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [onVisitorWallChange]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim() || status === 'sending') return;
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/visitor-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });
      const data = await response.json();
      const parsed = VisitorMessageSchema.safeParse(data.message);
      if (!response.ok || !parsed.success) throw new Error(data.error || 'Unable to add your note.');

      const next = [parsed.data, ...messages];
      setMessages(next);
      onVisitorWallChange?.(true, next);
      setContent('');
      setStatus('success');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to add your note.');
      setStatus('error');
    }
  };

  return (
    <WidgetCard className="max-w-md border-amber-200/70 bg-[#fff9e8]/95 p-4 dark:border-amber-100/15 dark:bg-stone-900/90">
      <div className="flex items-start gap-3"><span className="rounded-xl bg-amber-400/20 p-2 text-lg">📝</span><div><p className="text-sm font-bold text-stone-800 dark:text-amber-50">{isEnglish ? 'A wall of kind notes' : 'Bức tường lời nhắn nhủ'}</p><p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-300">{isEnglish ? 'Leave a small note. Kind words become part of this page.' : 'Để lại một mẩu nhắn nhủ nhỏ. Lời tử tế sẽ trở thành một phần của trang này.'}</p></div></div>
      <form onSubmit={submit} className="mt-4 space-y-2">
        <input value={author} onChange={(event) => setAuthor(event.target.value)} maxLength={40} placeholder={isEnglish ? 'Your name (optional)' : 'Tên của bạn (không bắt buộc)'} className="w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 text-xs text-stone-700 outline-none transition focus:border-amber-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
        <textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={280} rows={3} placeholder={isEnglish ? 'Write a kind note...' : 'Viết một lời nhắn tử tế...'} className="w-full resize-none rounded-xl border border-amber-200 bg-white/80 px-3 py-2 text-sm text-stone-700 outline-none transition focus:border-amber-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
        <div className="flex items-center justify-between gap-3"><span className="text-[11px] text-stone-400">{content.length}/280</span><button type="submit" disabled={!content.trim() || status === 'sending'} className="rounded-xl bg-stone-800 px-3 py-2 text-xs font-bold text-amber-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? (isEnglish ? 'Reviewing...' : 'Đang kiểm duyệt...') : (isEnglish ? 'Pin this note' : 'Ghim lời nhắn')}</button></div>
      </form>
      {status === 'success' && <p className="mt-2 text-xs font-medium text-emerald-600">{isEnglish ? 'Your note is now on the wall.' : 'Lời nhắn của bạn đã lên tường.'}</p>}
      {status === 'error' && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
      {messages.length > 0 && <div className="mt-4 flex gap-2 overflow-x-auto pb-1 custom-scrollbar">{messages.slice(0, 5).map((message) => <div key={message.id} className="min-w-[130px] max-w-[130px] rotate-[-1deg] bg-[#f8e8a8] p-2.5 text-stone-700 shadow-sm even:rotate-[1deg]"><p className="line-clamp-3 font-serif text-xs">{message.content}</p><p className="mt-2 truncate text-[10px] text-stone-500">- {message.author || (isEnglish ? 'A visitor' : 'Một người ghé qua')}</p></div>)}</div>}
    </WidgetCard>
  );
}

type WidgetRenderer = (props: WidgetProps) => React.ReactNode;

export const chatWidgetRegistry: Partial<Record<ChatWidget, WidgetRenderer>> = {
  about: WidgetAbout,
  projects: WidgetProjects,
  skills: WidgetSkills,
  contact: WidgetContact,
  music: WidgetMusic,
  projectDetail: WidgetProjectDetail,
  experience: WidgetExperience,
  techStack: WidgetTechStack,
  cv: WidgetCV,
  socialLinks: WidgetSocialLinks,
  availability: WidgetAvailability,
  quickActions: WidgetQuickActions,
  faq: WidgetFAQ,
  funFact: WidgetFunFact,
  githubStats: WidgetGithubStats,
  visitorMessages: WidgetVisitorMessages,
};

export function ChatWidget({ response, ...props }: WidgetProps & { response: ChatResponse }) {
  const Renderer = chatWidgetRegistry[response.widget];
  return Renderer ? <Renderer {...props} data={response.data} /> : null;
}
