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
  let cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  // Robust extraction: find first { and last }
  const startIdx = cleanJson.indexOf('{');
  const endIdx = cleanJson.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1) {
    cleanJson = cleanJson.substring(startIdx, endIdx + 1);
  }

  return JSON.parse(cleanJson);
}

export async function generateQuizContent(topic: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an enthusiastic technical mentor. Generate 20 multiple-choice questions about the tech topic: "${topic}".
    The questions should be designed to help a software developer review core IT industry knowledge, refresh programming fundamentals, and learn useful new concepts in a practical, accessible way.
    The entire quiz must be written in clear, concise English. Focus purely on testing technical knowledge, scenarios, and problem-solving, NOT on teaching English vocabulary.
    Avoid overly difficult "expert" interview questions. Focus on core fundamentals, daily tasks, common tools, and basic mental models.
    The response must be a VALID JSON object and NOTHING ELSE. No markdown formatting, no backticks.
    
    Structure the JSON exactly like this:
    {
      "title": "Daily Tech Quiz - ${topic}",
      "questions": [
        {
          "content": "Question text goes here...",
          "options": [
            { "id": "A", "text": "First option" },
            { "id": "B", "text": "Second option" },
            { "id": "C", "text": "Third option" },
            { "id": "D", "text": "Fourth option" }
          ],
          "correctOption": "A",
          "explanation": "Explanation of why A is correct and the others might be wrong."
        }
      ]
    }
    
    Guidelines:
    - Generate EXACTLY 20 questions.
    - Make the questions educational, practical, and easy to understand. Mix in questions about daily coding scenarios, terminology, and best practices.
    - Ensure only one option is fully correct.
    - The "correctOption" MUST be "A", "B", "C", or "D".
    - Explanation should be brief, encouraging, and highly educational.
    - Output ONLY valid JSON.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  let cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  const startIdx = cleanJson.indexOf('{');
  const endIdx = cleanJson.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1) {
    cleanJson = cleanJson.substring(startIdx, endIdx + 1);
  }

  return JSON.parse(cleanJson);
}

