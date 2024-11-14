import supabase from './supabaseClient';

export async function fetchLearningDetail(postId) {
  const { data, error } = await supabase
    .from('learning_posts')
    .select('*')
    .eq('id', postId)
    .single();
    
  if (error) throw error;
  return data;
}