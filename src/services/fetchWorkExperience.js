import supabase from './supabaseClient';

export async function fetchWorkExperience() {
  const { data, error } = await supabase.from('experience').select('*');
  if (error) throw error;
  return data;
}