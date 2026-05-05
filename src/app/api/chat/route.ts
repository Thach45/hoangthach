import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        model: 'llama-3.3-70b-versatile'
      })
    });

    const data = await response.json();

    // Check for API errors (Rate limits, etc.)
    if (!response.ok) {
      console.error('Groq API Error:', data);
      
      let friendlyMessage = "Hình như mình đang bận một chút, bạn đợi xíu rồi nhắn lại nhé! 😅";
      
      if (response.status === 429) {
        friendlyMessage = "Nhiều bạn đang nhắn tin quá nên mình hơi quá tải, đợi mình vài giây rồi tâm sự tiếp nha! 😊";
      }

      // Return a fake AI response structure so the frontend doesn't crash
      return NextResponse.json({
        choices: [{
          message: {
            content: friendlyMessage
          }
        }]
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      choices: [{
        message: {
          content: "Oops! Có lỗi gì đó rồi, bạn kiểm tra lại kết nối hoặc nhắn lại sau nhé! 😅"
        }
      }]
    });
  }
}
