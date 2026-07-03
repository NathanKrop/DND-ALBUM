# Email Service Setup Guide for breezydallas Contact Form

The contact form is now wired to the backend API at `/api/contact`. To enable email notifications, you need to configure an email service.

## Option 1: Using Formspree (Recommended - No Backend Required)

1. Go to https://formspree.io
2. Sign up and create a new form
3. Copy your form ID (format: `xxxxx`)
4. Update `.env.local`:
   ```
   EMAIL_SERVICE_URL=https://formspree.io/f/YOUR_FORM_ID
   ```
5. Restart the development server

## Option 2: Using Resend (Easy Transactional Email)

1. Sign up at https://resend.com
2. Create an API key
3. Install the package:
   ```bash
   npm install resend
   ```
4. Update `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   RESEND_FROM_EMAIL=noreply@breezydallas.com
   ```
5. Update `/src/app/api/contact/route.ts` to use Resend SDK

## Option 3: Using SendGrid

1. Sign up at https://sendgrid.com
2. Create an API key
3. Install the package:
   ```bash
   npm install @sendgrid/mail
   ```
4. Update `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_FROM_EMAIL=noreply@breezydallas.com
   ```
5. Update `/src/app/api/contact/route.ts` to use SendGrid SDK

## Option 4: Using Supabase (Store submissions + email)

1. Set up a Supabase project at https://supabase.com
2. Create a table for contact submissions
3. Update `.env.local`:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   ```
4. Update `/src/app/api/contact/route.ts` to insert into Supabase

## Testing Without Email Service

The form will work without any configuration - submissions will be logged to the server console. This is useful for testing.

## Update Contact Form Example

To send with Resend, update `/src/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, type, message } = await request.json();

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'breezydallas@example.com',
      replyTo: email,
      subject: `New Contact Form Submission - ${type}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

Choose the option that works best for your needs!
