import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendEnquiryEmail } from './services/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory enquiry store for record-keeping
const enquirySubmissions = [];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Alphadfy Insurance API',
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/enquiries
 * Main insurance enquiry endpoint
 */
app.post('/api/enquiries', async (req, res) => {
  try {
    const data = req.body.data || req.body;
    const name = data.name?.trim();
    const email = data.email?.trim();
    const phone = data.phone?.trim();
    const insuranceType = (data.insuranceType || data.insurance || data.plan)?.trim();

    // 1. Server-side Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    if (!phone || phone.length < 7) {
      return res.status(400).json({
        success: false,
        message: 'A valid phone number is required.',
      });
    }

    if (!insuranceType) {
      return res.status(400).json({
        success: false,
        message: 'Insurance type is required.',
      });
    }

    const enquiryRecord = {
      id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      phone,
      insuranceType,
      createdAt: new Date().toISOString(),
    };

    // Save record to local store
    enquirySubmissions.push(enquiryRecord);
    console.log('[Enquiry Successfully Stored]:', enquiryRecord);

    // 2. Dispatch email via Nodemailer
    try {
      await sendEnquiryEmail({
        name,
        email,
        phone,
        insuranceType,
      });
    } catch (emailErr) {
      console.error('⚠️ [Email Delivery Warning]:', emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully',
    });
  } catch (err) {
    console.error('[Enquiry Processing Error]:', err.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to submit enquiry',
    });
  }
});

// Backward-compatible alias for /api/quotes
app.post('/api/quotes', async (req, res, next) => {
  req.url = '/api/enquiries';
  return app._router.handle(req, res, next);
});

// List Enquiries (for admin review)
app.get('/api/enquiries', (req, res) => {
  res.json({
    success: true,
    count: enquirySubmissions.length,
    data: enquirySubmissions,
  });
});

app.get('/api/quotes', (req, res) => {
  res.json({
    success: true,
    count: enquirySubmissions.length,
    data: enquirySubmissions,
  });
});

// Contact Message Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('[Contact Message Received]:', { name, email, message });
  res.status(200).json({
    success: true,
    message: 'Thank you for contacting ALPHADFY. We will get back to you shortly.',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ALPHADFY Backend API is running on http://localhost:${PORT}`);
});
