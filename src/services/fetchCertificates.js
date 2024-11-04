import supabase from './supabaseClient';

export async function fetchCertificates() {
  const { data, error } = await supabase.from('certificates').select('*');
  if (error) throw error;
  return data;
}