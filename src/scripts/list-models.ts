const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
  
  try {
    // Note: The SDK might not have a direct listModels, we use the fetch API or a known method
    // In @google/generative-ai, we can try to fetch from the endpoint
    console.log("Checking available models for your API Key...");
    
    // Using fetch as a fallback to see the raw list from Google API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`);
    const data = await response.json();
    
    if (data.models) {
      console.log("\n--- CÁC MODEL BẠN CÓ THỂ SỬ DỤNG ---");
      data.models.forEach((m) => {
        console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
      });
      console.log("-----------------------------------\n");
    } else {
      console.log("Error or No models found:", data);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách model:", error);
  }
}

listModels();
