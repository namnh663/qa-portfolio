import supabase from './supabaseClient';

export async function fetchInterviewQA() {
  const { data, error } = await supabase
    .from('interview_qa')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchTopics() {
  const { data, error } = await supabase
    .from('interview_qa')
    .select('topic')
    .neq('topic', null); // Ensure we don't get null topics

  if (error) throw error;

  const topics = [...new Set(data.map(item => item.topic))];
  return topics;
}