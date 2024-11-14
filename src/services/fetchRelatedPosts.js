import supabase from './supabaseClient';

export async function fetchRelatedPosts(currentPostId) {
  const { data, error } = await supabase
    .from('learning_posts')
    .select('*')
    .neq('id', currentPostId)
    .limit(3);
    
  if (error) throw error;
  return data;
}