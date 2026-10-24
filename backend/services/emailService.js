import nodemailer from 'nodemailer';

/**
 * Creates and returns a Nodemailer transporter.
 * Supports standard SMTP (e.g., Gmail with App Password, Outlook, etc.).
 * Note: Render Free Tier blocks outbound ports 25, 465, and 587.
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  // If using Gmail, 'service: gmail' handles host, SSL and ports automatically
  if (host.includes('gmail') || user.endsWith('@gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });
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
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
};

/**
 * Sends an email notification to the Admin with enquiry details.
 *
 * Supports multiple delivery methods:
 * 1. Resend HTTP API (HTTPS port 443 - Recommended, 100% works on Render Free Tier)
 * 2. Web3Forms HTTP API (HTTPS port 443 - Instant free HTTP form emailer)
 * 3. Nodemailer SMTP (Works locally or on paid cloud hosts)
 */
export async function sendEnquiryEmail({ name, email, phone, insuranceType }) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || 'azhaghiriv@gmail.com';
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

  // 1. Resend HTTP REST API (Recommended for Render & cloud deployment)
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM?.trim() || 'ALPHADFY Enquiries <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [adminEmail],
          reply_to: email,
          subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`✅ [Resend HTTP Email Delivered to ${adminEmail}]: ID ${resData.id}`);
        return {
          provider: 'resend',
          success: true,
          messageId: resData.id,
        };
      } else {
        console.error('⚠️ [Resend API Error]:', resData);
      }
    } catch (resendErr) {
      console.error('⚠️ [Resend Request Failed]:', resendErr.message);
    }
  }

  // 2. Web3Forms HTTP REST API (Zero signup alternative)
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (web3FormsKey) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject,
          from_name: 'ALPHADFY Enquiry Alert',
          name,
          email,
          phone,
          insuranceType,
          message: `New Insurance Enquiry Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nInsurance Type: ${insuranceType}`,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        console.log(`✅ [Web3Forms HTTP Email Delivered to ${adminEmail}]`);
        return {
          provider: 'web3forms',
          success: true,
          data: resData,
        };
      } else {
        console.error('⚠️ [Web3Forms API Error]:', resData);
      }
    } catch (w3Err) {
      console.error('⚠️ [Web3Forms Request Failed]:', w3Err.message);
    }
  }

  // 3. Nodemailer SMTP (Works locally; blocked by Render Free Tier)
  const transporter = createTransporter();
  if (transporter) {
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
      console.log(`✅ [Nodemailer SMTP Delivered to ${adminEmail}]: Message ID ${info.messageId}`);
      return {
        provider: 'smtp',
        success: true,
        messageId: info.messageId,
      };
    } catch (mailErr) {
      console.error(`⚠️ [Nodemailer SMTP Delivery Warning]: ${mailErr.message}`);
      return {
        provider: 'smtp',
        failed: true,
        error: mailErr.message,
      };
    }
  }

  // 4. Fallback / Dev Mode when no credentials are configured
  console.log('\n==================================================');
  console.log('ℹ️  [ENQUIRY EMAIL SIMULATION - NO EMAIL CREDS FOUND]');
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Customer: ${name} (${email}, ${phone})`);
  console.log(`Product: ${insuranceType}`);
  console.log('Add RESEND_API_KEY (Recommended) or SMTP_USER & SMTP_PASS in Render Dashboard -> Environment.');
  console.log('==================================================\n');

  return {
    simulated: true,
    messageId: `simulated-${Date.now()}`,
  };
}
