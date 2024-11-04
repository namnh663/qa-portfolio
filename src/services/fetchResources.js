import supabase from './supabaseClient';

export async function fetchResources() {
  const { data, error } = await supabase.from('resources').select('*');
  if (error) throw error;
  return data;
}