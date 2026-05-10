import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function generateBlogContent(topic: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are a professional tech blog writer. Generate a blog post about "${topic}" in a structured JSON format.
    The response must be a VALID JSON object and NOTHING ELSE. No markdown formatting, no backticks.
    
    Structure:
    {
      "title": { "en": "...", "vi": "..." },
      "excerpt": { "en": "...", "vi": "..." },
      "category": "...",
      "readTime": "... min",
      "image": "https://images.unsplash.com/photo-...?q=80&w=1000", 
      "content": [
        { "type": "paragraph", "data": { "en": "...", "vi": "..." } },
        { "type": "heading", "level": 2, "data": { "en": "...", "vi": "..." } },
        { "type": "code-block", "code": "...", "language": "..." },
        { "type": "list-box", "title": { "en": "...", "vi": "..." }, "items": [ { "en": "...", "vi": "..." } ] },
        { "type": "quote", "data": { "en": "...", "vi": "..." } }
      ]
    }
    
    Guidelines:
    - GENERATE AT LEAST 8-12 CONTENT BLOCKS for a comprehensive long-form article.
    - Each paragraph should be detailed (at least 3-5 sentences).
    - Include multiple 'heading' (level 2 and 3) to structure the article.
    - Include at least 1-2 'code-block' with high-quality, practical code examples.
    - Use ONLY these categories: [Technology, Backend, AI & ML, Algorithms, Programming Languages, System Design, Database, Career, Vibe Code, News].
    - For the 'image' field, find a high-quality Unsplash image ID that matches the topic. If you don't have a specific ID, use 'https://source.unsplash.com/featured/?<keyword>' where <keyword> is a relevant tech term.
    - Content must be written as a relatable technical mentor sharing real-world experience, common pitfalls, and overlooked best practices.
    - Provide deep, authoritative but highly accessible and practical analysis (Senior level or below).
    - Provide both English and Vietnamese translations for every text field (except code).
    - Ensure the JSON is perfectly valid.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Clean up any potential markdown formatting if AI includes it
  const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  return JSON.parse(cleanJson);
}
