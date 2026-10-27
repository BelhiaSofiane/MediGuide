import { supabase } from '../lib/supabaseClient';

function assertSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

const CHECKUP_COLUMNS = 'id,user_id,symptoms,possible_conditions,severity,recommendation,is_simulated,created_at';

export async function fetchCheckups(userId, { offset = 0, limit = 20 } = {}) {
  assertSupabase();
  const { data, count, error } = await supabase
    .from('checkups')
    .select(CHECKUP_COLUMNS, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  return { checkups: data, count };
}

export async function createCheckup(payload) {
  assertSupabase();
  const { data, error } = await supabase
    .from('checkups')
    .insert(payload)
    .select(CHECKUP_COLUMNS)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
