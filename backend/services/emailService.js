/**
 * ALPHADFY Insurance - Email Service
 * 
 * Uses Resend HTTPS API (port 443) for reliable email delivery.
 * Render Free tier blocks outbound SMTP ports (25, 465, 587), so all emails
 * are delivered directly via HTTPS REST requests to https://api.resend.com/emails.
 */

/**
 * Sends an enquiry notification email to the Admin using Resend HTTPS API.
 * 
 * @param {Object} params
 * @param {string} params.name Customer full name
 * @param {string} params.email Customer email address
 * @param {string} params.phone Customer phone number
 * @param {string} params.insuranceType Insurance category requested
 * @returns {Promise<{ success: boolean, provider: string, messageId?: string, error?: string }>}
 */
export async function sendEnquiryEmail({ name, email, phone, insuranceType }) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || 'info@alphadfy.in';
  const fromEmail = process.env.RESEND_FROM?.trim() || 'ALPHADFY Insurance <info@alphadfy.in>';
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const subject = `New Insurance Enquiry - ${insuranceType}`;

  // 1. Validate Resend API Configuration
  if (!resendApiKey) {
    const configError = 'RESEND_API_KEY is not configured in environment variables.';
    console.error(`❌ [Resend Email Failed]: ${configError}`);
    return {
      success: false,
      provider: 'resend',
      error: configError,
    };
  }

  // 2. Email Body Contents
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

  // 3. Dispatch via Resend HTTPS REST API
  try {
    const response = await fetch('https://api.resend.com/emails', {
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

    const resData = await response.json().catch(() => ({}));

    if (response.ok && resData?.id) {
      console.log(`✅ [Resend HTTPS Email Delivered to ${adminEmail}]: ID ${resData.id}`);
      return {
        success: true,
        provider: 'resend',
        messageId: resData.id,
      };
    }

    const safeErrorMessage =
      resData?.message ||
      resData?.error ||
      resData?.name ||
      `HTTP status ${response.status}`;

    console.error(`❌ [Resend Email Failed]: HTTP ${response.status} - ${safeErrorMessage}`);

    return {
      success: false,
      provider: 'resend',
      status: response.status,
      error: safeErrorMessage,
    };
  } catch (fetchErr) {
    const safeErrorMessage = fetchErr?.message || 'Network request failed';
    console.error(`❌ [Resend Email Failed]: ${safeErrorMessage}`);

    return {
      success: false,
      provider: 'resend',
      error: safeErrorMessage,
    };
  }
}
