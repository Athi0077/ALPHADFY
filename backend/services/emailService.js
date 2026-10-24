import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer transporter.
 * Supports standard SMTP (e.g., Gmail with App Password, Outlook, etc.).
 * If credentials are not configured, returns null to gracefully trigger simulated mode.
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  // If credentials are blank/missing, do not throw an unhandled 500
  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for port 587
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert blocks on local Windows dev environments
    },
    connectionTimeout: 8000, // 8s timeout to prevent hanging on blocked cloud ports
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
};

/**
 * Sends an email notification to the Admin with enquiry details.
 *
 * @param {Object} enquiry
 * @param {string} enquiry.name
 * @param {string} enquiry.email
 * @param {string} enquiry.phone
 * @param {string} enquiry.insuranceType
 */
export async function sendEnquiryEmail({ name, email, phone, insuranceType }) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || 'azhaghiriv@gmail.com';

  const transporter = createTransporter();

  // 1. Fallback / Dev Mode when SMTP_USER or SMTP_PASS is not provided yet in backend/.env
  if (!transporter) {
    console.log('\n==================================================');
    console.log('ℹ️  [ENQUIRY EMAIL SIMULATION - NO SMTP CREDS IN .ENV]');
    console.log(`To: ${adminEmail}`);
    console.log(`Subject: New Insurance Enquiry - ${insuranceType}`);
    console.log(`Customer: ${name} (${email}, ${phone})`);
    console.log(`Product: ${insuranceType}`);
    console.log('To send real emails to your inbox, add SMTP_USER & SMTP_PASS in backend/.env.');
    console.log('==================================================\n');

    return {
      simulated: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  // 2. Real SMTP delivery
  const subject = `New Insurance Enquiry - ${insuranceType}`;

  const textContent = `New Enquiry Received

Name: ${name}
Email: ${email}
Phone: ${phone}
Insurance Type: ${insuranceType}

Please contact the customer regarding this enquiry.`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101827; max-width: 600px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #ffffff;">
      <h2 style="color: #B88328; border-bottom: 2px solid #D9A441; padding-bottom: 10px; margin-top: 0;">New Enquiry Received</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 18px 0;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #4b5563;">Name:</td>
          <td style="padding: 10px 0; color: #111827;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Email:</td>
          <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Phone:</td>
          <td style="padding: 10px 0; color: #111827;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Insurance Type:</td>
          <td style="padding: 10px 0; color: #111827; font-weight: bold;">${insuranceType}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; color: #6b7280; font-size: 14px; border-top: 1px solid #f3f4f6; padding-top: 12px;">
        Please contact the customer regarding this enquiry.
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'ALPHADFY Insurance'}" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ [Real Email Delivered to ${adminEmail}]: Message ID ${info.messageId}`);
    return info;
  } catch (mailErr) {
    console.error(`⚠️ [Email Delivery Warning]: Failed to deliver email - ${mailErr.message}`);
    return {
      failed: true,
      error: mailErr.message,
    };
  }
}
