# ALPHADFY Backend API

Express.js REST API service for quote requests, lead captures, and enquiry management.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Endpoints:
   - `GET /api/health` - Health check status
   - `POST /api/quotes` - Submit insurance quote request
   - `GET /api/quotes` - Retrieve received enquiries
   - `POST /api/contact` - Submit general contact enquiry
