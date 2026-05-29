'use server';

import { prisma } from '@/lib/prisma';

export async function getRecentQuizzes() {
  try {
    const quizzes = await prisma.quizSet.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
}

export async function getQuizById(id: string) {
  try {
    const quiz = await prisma.quizSet.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
    return quiz;
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    return null;
  }
}
