const rawApiUrl = (import.meta.env.VITE_API_URL || 'https://api.alphadfy.in').trim();
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');
export const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiries`;
export const HEALTH_ENDPOINT = `${API_BASE_URL}/api/health`;

let prewarmInitiated = false;

/**
 * Silently wake up the Render backend container when user lands on site.
 * Render free tier sleeps after 15m idle; prewarming avoids the 20-40s cold start.
 */
export function prewarmBackend() {
  if (prewarmInitiated) return;
  prewarmInitiated = true;

  try {
    fetch(HEALTH_ENDPOINT, {
      method: 'GET',
      keepalive: true,
    }).catch(() => {
      // Silent catch - retry once after 4s if cold start initial packet was dropped
      setTimeout(() => {
        fetch(HEALTH_ENDPOINT, { method: 'GET', keepalive: true }).catch(() => {});
      }, 4000);
    });
  } catch {
    // Non-blocking
  }
}
