import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, dates, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
    });

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D0B09;color:#F0E8D8;padding:32px;border-radius:8px;">
        <h2 style="color:#C9A84C;font-size:20px;margin-bottom:24px;border-bottom:1px solid rgba(201,168,76,0.3);padding-bottom:16px;">
          New Rental Request — Triple W Rentals
        </h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#A89880;font-size:13px;width:140px;">Name</td>
            <td style="padding:10px 0;color:#F0E8D8;font-size:14px;font-weight:500;">${name}</td>
          </tr>
          <tr style="border-top:1px solid rgba(201,168,76,0.1);">
            <td style="padding:10px 0;color:#A89880;font-size:13px;">Phone</td>
            <td style="padding:10px 0;color:#F0E8D8;font-size:14px;">
              <a href="tel:${phone}" style="color:#C9A84C;text-decoration:none;">${phone}</a>
            </td>
          </tr>
          <tr style="border-top:1px solid rgba(201,168,76,0.1);">
            <td style="padding:10px 0;color:#A89880;font-size:13px;">Rental Dates</td>
            <td style="padding:10px 0;color:#F0E8D8;font-size:14px;">${dates || 'Not specified'}</td>
          </tr>
          <tr style="border-top:1px solid rgba(201,168,76,0.1);">
            <td style="padding:10px 0;color:#A89880;font-size:13px;vertical-align:top;">Message</td>
            <td style="padding:10px 0;color:#F0E8D8;font-size:14px;line-height:1.6;">${message || 'No message provided'}</td>
          </tr>
        </table>
        <div style="margin-top:32px;padding:16px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:6px;">
          <p style="color:#A89880;font-size:12px;margin:0;">
            Submitted via triple-w-rentals.vercel.app · ${timestamp} CT
          </p>
        </div>
      </div>
    `;

    const subject = `New Rental Request — ${name}`;
    const from = 'Triple W Rentals <onboarding@resend.dev>';

    const results = await Promise.allSettled([
      resend.emails.send({ from, to: ['jcpl-07@hotmail.com'], subject, html: htmlBody }),
      resend.emails.send({ from, to: ['Triplewrentals@gmail.com'], subject, html: htmlBody }),
    ]);

    const allFailed = results.every((r) => r.status === 'rejected');
    if (allFailed) {
      console.error('All email sends failed:', results);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
