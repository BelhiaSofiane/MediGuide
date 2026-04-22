import { supabase } from '../lib/supabaseClient';

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

export async function fetchCheckups(userId) {
  assertSupabase();
  const { data, error } = await supabase
    .from('checkups')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createCheckup(payload) {
  assertSupabase();
  const { data, error } = await supabase
    .from('checkups')
    .insert(payload)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}
