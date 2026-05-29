import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQuizContent } from '@/lib/gemini';

// Configure this route to run via Vercel Cron or manual trigger
// Example Vercel cron config in vercel.json:
// { "crons": [{ "path": "/api/cron/generate-quiz", "schedule": "0 0 * * *" }] }

// Define topics with weights (higher weight = higher chance to be selected)
const TOPICS_WITH_WEIGHTS = [
  { name: "Frontend, UI/UX & Web Fundamentals", weight: 1 },
  { name: "Backend, Databases & APIs", weight: 3 },
  { name: "Object-Oriented Programming (OOP) & Architecture", weight: 2 },
  { name: "Developer IQ & Logical Puzzles", weight: 2 },
  { name: "Math Tricks & Algorithm Brain Teasers", weight: 1 }, // 8.3% chance
  { name: "Software Engineering, Git & Testing", weight: 1 }, // 8.3% chance
  { name: "General IT Terminology & Networking", weight: 2 }  // 8.3% chance
];

// Function to select a topic based on its weight
function getRandomTopic() {
  const totalWeight = TOPICS_WITH_WEIGHTS.reduce((sum, topic) => sum + topic.weight, 0);
  let randomNum = Math.random() * totalWeight;
  
  for (const topic of TOPICS_WITH_WEIGHTS) {
    if (randomNum <= topic.weight) {
      return topic.name;
    }
    randomNum -= topic.weight;
  }
  return TOPICS_WITH_WEIGHTS[0].name; // Fallback
}

export async function GET(req: Request) {
  // Validate cron request to prevent unauthorized abuse
  const authHeader = req.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // 1. Pick a topic based on weight
    const randomTopic = getRandomTopic();
    console.log(`[Cron] Generating quiz for topic: ${randomTopic}`);

    // 2. Call Gemini
    const quizData = await generateQuizContent(randomTopic);

    // 3. Save to Database
    const newQuizSet = await prisma.quizSet.create({
      data: {
        title: quizData.title,
        topic: randomTopic,
        questions: {
          create: quizData.questions.map((q: any) => ({
            content: q.content,
            options: q.options,
            correctOption: q.correctOption,
            explanation: q.explanation,
          })),
        },
      },
    });

    console.log(`[Cron] Successfully created QuizSet ID: ${newQuizSet.id}`);

    return NextResponse.json({
      success: true,
      message: `Quiz generated for topic: ${randomTopic}`,
      quizSetId: newQuizSet.id,
    });
  } catch (error) {
    console.error("[Cron] Error generating quiz:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
