import { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../services/fetchBlogPosts';

export const useBlogData = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateTopics = (posts) => {
    const topicCounts = posts.reduce((acc, post) => {
      acc[post.topic] = (acc[post.topic] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(topicCounts).map(([name, count]) => ({
      name,
      count,
    }));
  };

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        const postsData = await fetchBlogPosts();
        setPosts(postsData);
        setTopics(calculateTopics(postsData));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  return { posts, topics, loading, error };
};