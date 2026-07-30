import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { CHAT_SYSTEM_PROMPT } from '@/data/data';
import { ChatMessageSchema, ChatResponseSchema } from '@/lib/chat';

export const maxDuration = 60;

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: 'https://api.deepseek.com/v1',
});

const RequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(8),
});

const tools = [
  {
    type: 'function',
    function: {
      name: 'sendEmail',
      description: 'Send an email to Thach when a visitor wants to contact or hire him.',
      parameters: {
        type: 'object',
        properties: {
          visitorName: { type: 'string' },
          contactInfo: { type: 'string' },
          messageContent: { type: 'string' },
        },
        required: ['visitorName', 'contactInfo', 'messageContent'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'searchMusic',
      description: 'Search iTunes for songs and their preview links when a user asks about music.',
      parameters: {
        type: 'object',
        properties: { query: { type: 'string' } },
        required: ['query'],
      },
    },
  },
] as const;

const fallback = (text: string) => JSON.stringify({ text, widget: 'none' });

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

function normalizeModelResponse(content: string | null) {
  if (!content) return fallback('Oops! hệ thống đang bận một chút, bạn thử lại sau nhé! 😅');

  try {
    const cleaned = content.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = ChatResponseSchema.safeParse(JSON.parse(cleaned));
    if (parsed.success) return JSON.stringify(parsed.data);
  } catch {
    // Return a safe, user-facing fallback instead of passing malformed model output to the client.
  }

  return fallback('Mình vừa bị một con JSON bug chặn đường, thử nhắn lại nhé! 💀');
}

function parseToolArguments<T extends z.ZodTypeAny>(argumentsJson: string, schema: T) {
  try {
    return schema.safeParse(JSON.parse(argumentsJson));
  } catch {
    return { success: false } as const;
  }
}

export async function POST(req: Request) {
  try {
    const body = RequestSchema.safeParse(await req.json());
    if (!body.success) return NextResponse.json({ choices: [] }, { status: 400 });

    const formattedHistory = body.data.messages.map((message) => ({
      role: message.role === 'user' ? 'user' : 'assistant',
      content: message.content,
    }));
    const latest = formattedHistory.at(-1);
    if (latest) latest.content = latest.content.slice(0, 1000);

    const openAiMessages: Array<Record<string, unknown>> = [
      { role: 'system', content: CHAT_SYSTEM_PROMPT },
      ...formattedHistory,
    ];
    let finalResponse: string | null = null;

    for (let attempts = 0; attempts < 3; attempts += 1) {
      const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: openAiMessages as never,
        tools: tools as never,
        response_format: { type: 'json_object' },
      });
      const responseMessage = response.choices[0]?.message;
      if (!responseMessage) break;

      openAiMessages.push(responseMessage as unknown as Record<string, unknown>);
      if (!responseMessage.tool_calls?.length) {
        finalResponse = normalizeModelResponse(responseMessage.content);
        break;
      }

      for (const toolCall of responseMessage.tool_calls) {
        const functionCall = 'function' in toolCall ? toolCall.function : null;
        if (!functionCall) continue;

        if (functionCall.name === 'searchMusic') {
          const args = parseToolArguments(functionCall.arguments, z.object({ query: z.string().min(1).max(120) }));
          if (!args.success) continue;

          try {
            const itunesResponse = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(args.data.query)}&entity=song&limit=5`);
            const itunesData = await itunesResponse.json();
            const tracks = Array.isArray(itunesData.results)
              ? itunesData.results
                  .filter((item: { previewUrl?: unknown }) => typeof item.previewUrl === 'string')
                  .map((item: { trackName?: string; artistName?: string; artworkUrl100?: string; previewUrl: string }) => ({
                    title: item.trackName || 'Unknown track',
                    artist: item.artistName || 'Unknown artist',
                    artwork: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
                    url: item.previewUrl,
                  }))
              : [];
            openAiMessages.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ success: true, tracks }) });
          } catch {
            openAiMessages.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ success: false, tracks: [] }) });
          }
        }

        if (functionCall.name === 'sendEmail') {
          const args = parseToolArguments(functionCall.arguments, z.object({
            visitorName: z.string().min(1).max(120),
            contactInfo: z.string().min(3).max(200),
            messageContent: z.string().min(1).max(3000),
          }));

          let sent = false;
          if (args.success && process.env.RESEND_API_KEY && process.env.CONTACT_RECEIVER_EMAIL) {
            const { visitorName, contactInfo, messageContent } = args.data;
            const emailResponse = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: 'AI Assistant <onboarding@resend.dev>',
                to: process.env.CONTACT_RECEIVER_EMAIL,
                subject: `New contact from ${visitorName}`,
                html: `<div><h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(visitorName)}</p><p><strong>Contact:</strong> ${escapeHtml(contactInfo)}</p><p><strong>Message:</strong></p><blockquote>${escapeHtml(messageContent).replace(/\n/g, '<br/>')}</blockquote></div>`,
              }),
            });
            sent = emailResponse.ok;
          }
          openAiMessages.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ success: sent }) });
        }
      }
    }

    return NextResponse.json({ choices: [{ message: { content: finalResponse || fallback('Oops! hệ thống đang bận...') } }] });
  } catch (error) {
    console.error('Chat request failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ choices: [{ message: { content: fallback('Oops! tôi đang bận một chút, bạn thử lại sau nhé! 😅') } }] });
  }
}
