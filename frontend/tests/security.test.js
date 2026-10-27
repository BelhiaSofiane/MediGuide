import test from 'node:test';
import assert from 'node:assert/strict';
import { validateClientEnv } from '../config/validateEnv.js';

const publicEnv = {
  VITE_SUPABASE_URL: 'https://example.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'sb_publishable_example',
};

test('accepts the documented public settings and optional unconfigured dev mode', () => {
  assert.doesNotThrow(() => validateClientEnv(publicEnv, { requireConfigured: true }));
  assert.doesNotThrow(() => validateClientEnv({}));
  assert.throws(() => validateClientEnv({}, { requireConfigured: true }), /required/);
});

test('rejects unexpected client variables and privileged keys without echoing values', () => {
  assert.throws(() => validateClientEnv({ ...publicEnv, VITE_PRIVATE_PASSWORD: 'example-secret' }), /Unexpected VITE_/);
  assert.throws(() => validateClientEnv({ ...publicEnv, VITE_SUPABASE_ANON_KEY: 'sb_secret_example' }), /server-only/);
  const fakeServiceRole = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from(JSON.stringify({ role: 'service_role' })).toString('base64url')}.signature`;
  assert.throws(() => validateClientEnv({ ...publicEnv, VITE_SUPABASE_ANON_KEY: fakeServiceRole }), /publishable or legacy anon/);
  assert.throws(() => validateClientEnv({ ...publicEnv, VITE_SUPABASE_URL: 'http://example.com' }), /HTTPS/);
});
