// Email service using SendGrid - based on javascript_sendgrid integration
import { MailService } from '@sendgrid/mail';

// Initialize SendGrid service
let mailService: MailService | null = null;

function getMailService(): MailService | null {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not configured - email notifications disabled');
    return null;
  }

  if (!mailService) {
    mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  return mailService;
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const service = getMailService();
  if (!service) {
    console.log('Email notification skipped - SendGrid not configured');
    return false;
  }

  try {
    const mail = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      ...(params.text ? { text: params.text } : {}),
      ...(params.html ? { html: params.html } : {}),
    };
    
    await service.send(mail);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export interface LeadNotificationData {
  id: string;
  persona: string;
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  stayLength: string;
  currentCoverage: string;
  preexisting: boolean;
  notes?: string | null;
  createdAt: string;
}

export async function sendLeadNotification(leadData: LeadNotificationData): Promise<boolean> {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@asknewton.com';
  const toEmail = process.env.NOTIFICATION_EMAIL || 'leads@asknewton.com';

  const emailContent = {
    to: toEmail,
    from: fromEmail,
    subject: `New AskNewton Lead: ${leadData.persona.toUpperCase()} - ${leadData.name}`,
    text: generateLeadEmailText(leadData),
    html: generateLeadEmailHtml(leadData)
  };

  return await sendEmail(emailContent);
}

function generateLeadEmailText(lead: LeadNotificationData): string {
  return `
New Lead Submission - AskNewton California

Lead Details:
- ID: ${lead.id}
- Persona: ${lead.persona.toUpperCase()}
- Name: ${lead.name}
- Email: ${lead.email}
- Phone: ${lead.phone}
- Arrival Date: ${lead.arrivalDate}
- Stay Length: ${lead.stayLength}
- Current Coverage: ${lead.currentCoverage}
- Pre-existing Conditions: ${lead.preexisting ? 'Yes' : 'No'}
- Notes: ${lead.notes || 'None'}
- Submitted: ${new Date(lead.createdAt).toLocaleString()}

Follow up with this lead promptly!
  `.trim();
}

function generateLeadEmailHtml(lead: LeadNotificationData): string {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Lead - AskNewton California
          </h1>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Lead Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Lead ID:</td><td style="padding: 8px 0;">${lead.id}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Persona:</td><td style="padding: 8px 0; text-transform: uppercase; color: #2563eb;">${lead.persona}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${lead.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Arrival Date:</td><td style="padding: 8px 0;">${lead.arrivalDate}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Stay Length:</td><td style="padding: 8px 0;">${lead.stayLength}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Current Coverage:</td><td style="padding: 8px 0;">${lead.currentCoverage}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Pre-existing Conditions:</td><td style="padding: 8px 0;">${lead.preexisting ? 'Yes' : 'No'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Notes:</td><td style="padding: 8px 0;">${lead.notes || 'None'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${new Date(lead.createdAt).toLocaleString()}</td></tr>
            </table>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-weight: bold; color: #92400e;">
              🚀 Follow up with this lead promptly for the best conversion rate!
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}