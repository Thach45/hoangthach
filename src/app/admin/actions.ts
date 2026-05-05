import { generateBlogContentAction } from "./ai-server-actions";
import toast from "react-hot-toast";

// This is a client-side wrapper for the AI call to be used in components
export async function handleAiGeneration(topic: string) {
  const loadingToast = toast.loading("Gemini is writing your blog (Server Action)...");
  try {
    const result = await generateBlogContentAction(topic);
    
    if (result.success) {
      toast.success("Blog content generated!", { id: loadingToast });
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error: any) {
    toast.error(`AI Generation failed: ${error.message}`, { id: loadingToast });
    console.error(error);
    return null;
  }
}
