import supabase from './supabaseClient';

export async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false }); // Order by created_at descending

  if (error) throw error;
  return data;
}