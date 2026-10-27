const ALLOWED_CLIENT_VARIABLES = new Set([
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
]);

export function validateClientEnv(env, { requireConfigured = false } = {}) {
  if (Object.keys(env).some((name) => name.startsWith('VITE_') && !ALLOWED_CLIENT_VARIABLES.has(name))) {
    throw new Error('Unexpected VITE_ variable. Only the documented public Supabase settings may be bundled.');
  }

  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url && !key && !requireConfigured) return;
  if (!url || !key) throw new Error('Both public Supabase settings are required.');

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error('The public Supabase URL is invalid.');
  }
  if (parsedUrl.protocol !== 'https:' && !(parsedUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsedUrl.hostname))) {
    throw new Error('The public Supabase URL must use HTTPS, except for local development.');
  }

  if (key.startsWith('sb_secret_')) throw new Error('A server-only Supabase key cannot be bundled.');
  if (key.startsWith('sb_publishable_')) return;

  // Legacy anon keys are JWTs. Decode only their role; never print the key.
  try {
    const parts = key.split('.');
    if (parts.length === 3 && JSON.parse(Buffer.from(parts[1], 'base64url').toString()).role === 'anon') return;
  } catch {
    // Invalid or privileged JWTs are rejected below.
  }
  throw new Error('Use a Supabase publishable or legacy anon key for the frontend.');
}
