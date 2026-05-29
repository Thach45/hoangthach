import { generateQuizContent } from '../src/lib/gemini.js';
import { config } from 'dotenv';
config();

async function run() {
  try {
    const data = await generateQuizContent("System Design");
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("ERROR:", e);
  }
}
run();
