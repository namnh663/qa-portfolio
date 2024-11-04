import supabase from './supabaseClient';

export async function fetchSkills() {
  const { data, error } = await supabase.from('skills').select('*');
  if (error) throw error;
  return data;
}