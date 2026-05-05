import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Khởi tạo Resend với API Key (sẽ lấy từ biến môi trường)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Gửi email
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL || 'hoangthach.work@gmail.com', // Ưu tiên biến env
      subject: `New Message: ${subject}`,
     
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6366f1;">Bạn có tin nhắn mới từ Portfolio!</h2>
          <p><strong>Người gửi:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tiêu đề:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nội dung:</strong></p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
