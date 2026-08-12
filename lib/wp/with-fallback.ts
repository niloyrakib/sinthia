import { isWpConfigured } from "./config";

let warned = false;

function warnOnce(context: string, error?: unknown) {
  if (warned) return;
  warned = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[sinthia] WordPress API not reachable for "${context}" — using mock data. ` +
      `Set NEXT_PUBLIC_WP_API_URL to connect a real backend.`,
    error,
  );
}

/**
 * Tries the real WP-backed function first when NEXT_PUBLIC_WP_API_URL is
 * configured; falls back to mock data if it's unset or the request fails.
 * This keeps every page fully functional in local/dev/preview builds with
 * no backend, and becomes the real data path the moment WP is connected —
 * no component code changes required either way.
 */
export async function withWpFallback<T>(
  context: string,
  wpCall: () => Promise<T>,
  mockCall: () => Promise<T>,
): Promise<T> {
  if (!isWpConfigured) return mockCall();

  try {
    return await wpCall();
  } catch (error) {
    warnOnce(context, error);
    return mockCall();
  }
}
