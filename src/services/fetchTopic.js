import supabase from './supabaseClient';

export async function fetchTopic(topic) {
  const { data, error } = await supabase.from('posts').select('*').eq('topic', topic);
  if (error) throw error;
  return data;
}