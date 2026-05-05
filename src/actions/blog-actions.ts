"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(data: any) {
  try {
    const postData = {
      ...data,
      slug: data.slug || data.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: data.likes || Math.floor(Math.random() * 50) + 10,
    };

    const post = await prisma.post.create({
      data: postData,
    });
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true, post };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete post error:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function getPosts(page = 1, limit = 7, category = 'All', search = '') {
  try {
    const skip = (page - 1) * limit;
    
    // Build filter query
    const where: any = {};
    if (category !== 'All') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { en: { contains: search, mode: 'insensitive' } } },
        { title: { vi: { contains: search, mode: 'insensitive' } } },
        { excerpt: { en: { contains: search, mode: 'insensitive' } } },
        { excerpt: { vi: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where })
    ]);

    return {
      posts: JSON.parse(JSON.stringify(posts)),
      total,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Get posts error:", error);
    return { posts: [], total: 0, totalPages: 0 };
  }
}
