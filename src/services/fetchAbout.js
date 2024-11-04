import supabase from './supabaseClient';

export async function fetchAbout() {
  const { data, error } = await supabase.from('about_me').select('*').single();
  if (error) throw error;
  return data;
}