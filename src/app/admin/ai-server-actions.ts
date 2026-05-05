"use server";

import { generateBlogContent } from "@/lib/gemini";

export const maxDuration = 60;

export async function generateBlogContentAction(topic: string) {
  try {
    const content = await generateBlogContent(topic);
    return { success: true, data: content };
  } catch (error: any) {
    console.error("AI Generation Server Error:", error);
    return { success: false, error: error.message || "Failed to generate content" };
  }
}
