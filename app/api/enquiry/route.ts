import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await resend.emails.send({
      from: 'CollegeSenior <onboarding@resend.dev>',
      to: process.env.MANAGER_EMAIL || 'manager@example.com',
      subject: `New Enquiry from ${data.sourcePage}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Source:</strong> ${data.sourcePage}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Study Level:</strong> ${data.studyLevel}</p>
        <p><strong>Interested Field:</strong> ${data.interestedField}</p>
        ${data.cityState ? `<p><strong>City/State:</strong> ${data.cityState}</p>` : ''}
        ${Object.entries(data.hiddenFields || {}).map(([key, value]) => 
          `<p><strong>${key}:</strong> ${value}</p>`
        ).join('')}
      `
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
