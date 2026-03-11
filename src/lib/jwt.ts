/**
 * Mock JWT utilities for development only.
 * These are NOT cryptographically secure.
 * Replace with a real JWT library (e.g. jose) when the backend is ready.
 */

export const generateMockToken = (payload: Record<string, unknown>): string => {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  );
  const signature = btoa("mock-signature");
  return `${header}.${body}.${signature}`;
};

export const decodeMockToken = (
  token: string
): Record<string, unknown> | null => {
  try {
    const [, body] = token.split(".");
    return JSON.parse(atob(body)) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const isMockTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  const payload = decodeMockToken(token);
  if (!payload) return false;
  const exp = payload.exp as number | undefined;
  if (!exp) return true;
  return Math.floor(Date.now() / 1000) < exp;
};
