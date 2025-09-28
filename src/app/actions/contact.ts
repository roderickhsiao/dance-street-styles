'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: 'correction' | 'contribution' | 'question' | 'collaboration';
  instagram?: string;
  twitter?: string;
  website?: string;
  attachments?: File[];
}

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Validate form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const category = formData.get('category') as string;
    const instagram = formData.get('instagram') as string;
    const twitter = formData.get('twitter') as string;
    const website = formData.get('website') as string;
    
    // Handle file attachments
    const attachmentCount = parseInt(formData.get('attachmentCount') as string || '0');
    const attachments: File[] = [];
    for (let i = 0; i < attachmentCount; i++) {
      const file = formData.get(`attachment_${i}`) as File;
      if (file) {
        attachments.push(file);
      }
    }

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: 'Please fill in all fields',
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return {
        success: false,
        error: 'Email service is not configured. Please try again later.',
      };
    }

    console.log('Attempting to send email with Resend...');

    // Process attachments for Resend
    const emailAttachments = await Promise.all(
      attachments.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          filename: file.name,
          content: Buffer.from(buffer),
          contentType: file.type,
        };
      })
    );

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: `${email} <onboarding@resend.dev>`,
      to: ['roderickhsiao@gmail.com'],
      subject: `[Dance Street Styles] ${subject}`,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="
          margin: 0; 
          padding: 20px; 
          background-color: #0a0a0a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 520px; margin: 0 auto;">
            <tr>
              <td>
            
            <!-- Main Container -->
            <table cellpadding="0" cellspacing="0" border="0" style="
              width: 100%;
              background-color: #1a1a1a;
              border-radius: 12px;
              border: 1px solid #333333;
              overflow: hidden;
            ">
              
              <!-- Header -->
              <tr>
                <td style="
                  padding: 32px 32px 24px 32px;
                  border-bottom: 1px solid #2a2a2a;
                ">
                  <!-- Dance Street Styles Logo -->
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 20px 0;">
                    <tr>
                      <td style="
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6);
                        border-radius: 8px;
                        text-align: center;
                        vertical-align: middle;
                      ">
                        <span style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          line-height: 40px;
                        ">🕺</span>
                      </td>
                    </tr>
                  </table>
                  
                  <h1 style="
                    margin: 0;
                    font-size: 20px;
                    font-weight: 600;
                    color: #ffffff;
                    line-height: 1.3;
                  ">${subject}</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 24px 32px;">
                
                <!-- Contact Info -->
                <table cellpadding="0" cellspacing="0" border="0" style="
                  width: 100%;
                  margin-bottom: 24px;
                ">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <div style="
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #888888;
                        font-weight: 500;
                      ">Contact Information</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="
                        font-size: 16px;
                        font-weight: 500;
                        color: #ffffff;
                        margin-bottom: 4px;
                      ">${name}</div>
                      <a href="mailto:${email}" style="
                        color: #f97316;
                        text-decoration: none;
                        font-size: 14px;
                        margin-bottom: 8px;
                        display: block;
                      ">${email}</a>
                      ${category ? `
                      <div style="
                        font-size: 12px;
                        color: #f97316;
                        background-color: #2a2a2a;
                        padding: 4px 8px;
                        border-radius: 4px;
                        display: inline-block;
                        margin-bottom: 8px;
                        text-transform: capitalize;
                      ">${category}</div>` : ''}
                      ${(instagram || twitter || website) ? `
                      <div style="margin-top: 8px;">
                        ${instagram ? `<div style="font-size: 13px; color: #cccccc; margin-bottom: 2px;">📷 @${instagram}</div>` : ''}
                        ${twitter ? `<div style="font-size: 13px; color: #cccccc; margin-bottom: 2px;">🐦 @${twitter}</div>` : ''}
                        ${website ? `<div style="font-size: 13px; color: #cccccc;"><a href="${website.startsWith('http') ? website : 'https://' + website}" style="color: #f97316; text-decoration: none;">🌐 ${website}</a></div>` : ''}
                      </div>` : ''}
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-bottom: 24px;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <div style="
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #888888;
                        font-weight: 500;
                      ">Message</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="
                        font-size: 15px;
                        line-height: 1.6;
                        color: #cccccc;
                        white-space: pre-wrap;
                      ">${message}</div>
                    </td>
                  </tr>
                </table>

                ${attachments.length > 0 ? `
                <!-- Attachments -->
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <div style="
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #888888;
                        font-weight: 500;
                      ">Attachments (${attachments.length})</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ${attachments.map(file => `
                      <div style="
                        display: flex;
                        align-items: center;
                        padding: 8px 12px;
                        background-color: #2a2a2a;
                        border-radius: 6px;
                        margin-bottom: 6px;
                        border: 1px solid #333333;
                      ">
                        <span style="margin-right: 8px; font-size: 16px;">
                          ${file.type.startsWith('image/') ? '🖼️' : file.type === 'application/pdf' ? '📄' : '📋'}
                        </span>
                        <div>
                          <div style="
                            font-size: 14px;
                            color: #ffffff;
                            font-weight: 500;
                          ">${file.name}</div>
                          <div style="
                            font-size: 12px;
                            color: #888888;
                          ">${(file.size / 1024 / 1024).toFixed(2)} MB • ${file.type}</div>
                        </div>
                      </div>
                      `).join('')}
                    </td>
                  </tr>
                </table>` : ''}

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  padding: 16px 32px 24px 32px;
                  border-top: 1px solid #2a2a2a;
                ">
                  <p style="
                    margin: 0;
                    font-size: 12px;
                    color: #666666;
                  ">
                    Dance Street Styles - Preserving Hip-Hop Culture
                  </p>
                </td>
              </tr>

            </table>
            
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      };
    }

    return {
      success: true,
      message: "Thank you for reaching out! I'll get back to you soon about Dance Street Styles.",
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}