import supabase from './supabaseClient';

export async function fetchLearningPosts() {
  const { data, error } = await supabase
    .from('learning_posts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}