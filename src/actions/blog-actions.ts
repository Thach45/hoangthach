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

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}
