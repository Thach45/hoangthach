const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Đọc .env thủ công để chắc chắn
const envPath = path.join(__dirname, '../../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim().replace(/['"]/g, '') : "";

async function listModels() {
  console.log("Checking available models for your API Key...");
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (data.models) {
      console.log("\n--- CÁC MODEL BẠN CÓ THỂ SỬ DỤNG ---");
      data.models.forEach((m) => {
        // Chỉ hiện các model hỗ trợ generateContent
        if (m.supportedGenerationMethods.includes('generateContent')) {
           console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
        }
      });
      console.log("-----------------------------------\n");
    } else {
      console.log("Error or No models found. Please check your API Key in .env");
      console.log("Raw response:", data);
    }
  } catch (error) {
    console.error("Lỗi khi kết nối tới Google API:", error);
  }
}

listModels();
