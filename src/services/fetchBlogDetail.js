import supabase from './supabaseClient';

export async function fetchBlogDetail(postId) {
  const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
  if (error) throw error;
  return data;
}