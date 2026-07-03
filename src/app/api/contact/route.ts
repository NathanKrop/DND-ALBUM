import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, type, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email via Formspree (alternative: use your own SMTP service)
    // For now, we'll use Resend.com API (you can switch to any email service)
    // Update this with your actual email service configuration

    // Option 1: Using Formspree (recommended - no setup needed)
    // const formspreeUrl = 'https://formspree.io/f/YOUR_FORM_ID';
    // const res = await fetch(formspreeUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, type, message }),
    // });

    // Option 2: Using environment variable approach (for any email service)
    const emailServiceUrl = process.env.EMAIL_SERVICE_URL;
    
    if (!emailServiceUrl) {
      console.log('Email service not configured. Contact form submission:', {
        name,
        email,
        type,
        message,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json(
        { success: true, message: 'Thank you for reaching out! We will get back to you soon.' },
        { status: 200 }
      );
    }

    const res = await fetch(emailServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        type,
        message,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
