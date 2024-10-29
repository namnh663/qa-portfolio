import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

const BlogTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*');
      
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        calculateTopics(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const calculateTopics = (posts) => {
    const topicCounts = {};
    posts.forEach((post) => {
      const topic = post.topic;
      if (topicCounts[topic]) {
        topicCounts[topic]++;
      } else {
        topicCounts[topic] = 1;
      }
    });

    const topicsArray = Object.keys(topicCounts).map((topic) => ({
      name: topic,
      count: topicCounts[topic],
    }));

    setTopics(topicsArray);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold">Topics</h2>
      <ul className="mt-4 space-y-2">
        {topics.map((topic) => (
          <li key={topic.name} className="flex justify-between items-center">
            <Link to={`/topics/${topic.name}`} className="text-gray-600">
              {topic.name}
            </Link>
            <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {topic.count}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BlogTopics;