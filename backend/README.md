# ALPHADFY Backend API

Express.js REST API service for quote requests, lead captures, and enquiry management.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=production
   ADMIN_EMAIL=info@alphadfy.in
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM=ALPHADFY Insurance <info@alphadfy.in>
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Endpoints:
   - `GET /api/health` - Health check status
   - `GET /api/email-status` - Email delivery service diagnostic status
   - `POST /api/enquiries` - Submit insurance enquiry (sends notification via Resend HTTPS API)
   - `GET /api/enquiries` - Retrieve stored enquiries
   - `POST /api/contact` - Submit general contact enquiry
