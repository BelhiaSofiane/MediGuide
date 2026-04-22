import { supabase } from '../lib/supabaseClient';

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

export async function signInWithPassword(email, password) {
  assertSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
  return data;
}

export async function signUpWithPassword(email, password) {
  assertSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw error;
  }
  return data;
}

export async function signOut() {
  assertSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getSession() {
  assertSupabase();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
}

export function onAuthStateChange(callback) {
  assertSupabase();
  return supabase.auth.onAuthStateChange(callback);
}
