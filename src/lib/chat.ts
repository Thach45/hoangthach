import { z } from 'zod';

export const ChatWidgetSchema = z.enum([
  'none',
  'about',
  'projects',
  'skills',
  'contact',
  'music',
  'projectDetail',
  'experience',
  'techStack',
  'cv',
  'socialLinks',
  'availability',
  'quickActions',
  'faq',
  'funFact',
  'githubStats',
  'visitorMessages',
]);

export const MusicTrackSchema = z.object({
  title: z.string(),
  artist: z.string(),
  artwork: z.union([z.string().url(), z.literal('')]).optional().default(''),
  url: z.string().url(),
});

export const ChatResponseSchema = z.object({
  text: z.string().min(1).max(1200),
  widget: ChatWidgetSchema,
  data: z.record(z.string(), z.unknown()).optional(),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type ChatWidget = z.infer<typeof ChatWidgetSchema>;
export type MusicTrack = z.infer<typeof MusicTrackSchema>;

export const VisitorMessageSchema = z.object({
  id: z.string(),
  content: z.string().min(1).max(280),
  author: z.string().max(40).nullable(),
  createdAt: z.string(),
});

export type VisitorMessage = z.infer<typeof VisitorMessageSchema>;

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  // Assistant messages can include widget payloads such as music artwork and preview URLs.
  content: z.string().min(1).max(8_000),
});

export function parseChatResponse(content: string): ChatResponse {
  try {
    const cleanContent = content.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = ChatResponseSchema.safeParse(JSON.parse(cleanContent));

    if (parsed.success) return parsed.data;
  } catch {
    // A text-only fallback keeps the conversation usable if a model response is malformed.
  }

  return { text: content, widget: 'none' };
}
